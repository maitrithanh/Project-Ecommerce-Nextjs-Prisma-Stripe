import SetQuantity from "@/app/components/products/SetQuantity";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { error } from "console";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { toast } from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFormCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, SetCartTotalQty] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  //update & set value
  useEffect(() => {
    const cartItems: any = localStorage.getItem("shopCartItems");
    const cProducts: CartProductType[] | null = JSON.parse(cartItems);
    const triThanhPaymentIntent: any = localStorage.getItem(
      "triThanhPaymentIntent"
    );
    const paymentIntent: string | null = JSON.parse(triThanhPaymentIntent);

    setCartProducts(cProducts);
    setPaymentIntent(paymentIntent);
  }, []);

  useEffect(() => {
    const getTotals = () => {
      if (cartProducts) {
        const { total, qty } = cartProducts?.reduce(
          (acc, item) => {
            const itemTotal = item.price * item.quantity;

            acc.total += itemTotal;
            acc.qty += item.quantity;

            return acc;
          },
          { total: 0, qty: 0 }
        );

        SetCartTotalQty(qty);
        setCartTotalAmount(total);
      }
    };
    getTotals();
  }, [cartProducts]);

  //Add product to cart
  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updateCart;

      if (prev) {
        updateCart = [...prev, product];
      } else {
        updateCart = [product];
      }
      toast.success("Product added to cart", { id: product.id });
      localStorage.setItem("shopCartItems", JSON.stringify(updateCart));
      return updateCart;
    });
  }, []);

  //Remove product from cart
  const handleRemoveProductFormCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const fillteredProducts = cartProducts.filter((item) => {
          return item.id != product.id;
        });

        setCartProducts(fillteredProducts);
        toast.success("Product Removed", { id: product.id });
        localStorage.setItem(
          "shopCartItems",
          JSON.stringify(fillteredProducts)
        );
      }
    },
    [cartProducts]
  );

  //Update quantity product in cart
  const handleCartQtyIncrease = useCallback(
    (product: CartProductType) => {
      let updateCart;
      if (product.quantity === 99) {
        return toast.error("Ooops! Maximum reached");
      }

      if (cartProducts) {
        updateCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updateCart[existingIndex].quantity = ++updateCart[existingIndex]
            .quantity;
        }
        setCartProducts(updateCart);
        localStorage.setItem("shopCartItems", JSON.stringify(updateCart));
      }
    },
    [cartProducts]
  );

  //Update quantity product in cart
  const handleCartQtyDecrease = useCallback(
    (product: CartProductType) => {
      let updateCart;
      if (product.quantity === 1) {
        return toast.error("Ooops! Minimum reached");
      }

      if (cartProducts) {
        updateCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updateCart[existingIndex].quantity = --updateCart[existingIndex]
            .quantity;
        }
        setCartProducts(updateCart);
        localStorage.setItem("shopCartItems", JSON.stringify(updateCart));
      }
    },
    [cartProducts]
  );

  //handle clear cart
  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    SetCartTotalQty(0);
    localStorage.setItem("shopCartItems", JSON.stringify(null));
    // toast.success("Cleared!");
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback(
    (val: string | null) => {
      setPaymentIntent(val);
      localStorage.setItem("triThanhPaymentIntent", JSON.stringify(val));
    },
    [paymentIntent]
  );

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFormCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
  };
  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
