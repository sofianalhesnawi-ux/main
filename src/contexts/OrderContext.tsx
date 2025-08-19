import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, Color, Size, Design, Customer, OrderItem } from '../types';

interface OrderState {
  currentStep: number;
  selectedProduct: Product | null;
  selectedColor: Color | null;
  selectedSize: Size | null;
  selectedDesign: Design | null;
  quantity: number;
  customer: Customer | null;
  isOrderComplete: boolean;
}

type OrderAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_PRODUCT'; payload: Product }
  | { type: 'SET_COLOR'; payload: Color }
  | { type: 'SET_SIZE'; payload: Size }
  | { type: 'SET_DESIGN'; payload: Design }
  | { type: 'SET_QUANTITY'; payload: number }
  | { type: 'SET_CUSTOMER'; payload: Customer }
  | { type: 'COMPLETE_ORDER' }
  | { type: 'RESET_ORDER' };

const initialState: OrderState = {
  currentStep: 1,
  selectedProduct: null,
  selectedColor: null,
  selectedSize: null,
  selectedDesign: null,
  quantity: 1,
  customer: null,
  isOrderComplete: false,
};

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_PRODUCT':
      return { ...state, selectedProduct: action.payload };
    case 'SET_COLOR':
      return { ...state, selectedColor: action.payload };
    case 'SET_SIZE':
      return { ...state, selectedSize: action.payload };
    case 'SET_DESIGN':
      return { ...state, selectedDesign: action.payload };
    case 'SET_QUANTITY':
      return { ...state, quantity: action.payload };
    case 'SET_CUSTOMER':
      return { ...state, customer: action.payload };
    case 'COMPLETE_ORDER':
      return { ...state, isOrderComplete: true };
    case 'RESET_ORDER':
      return initialState;
    default:
      return state;
  }
};

interface OrderContextType {
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
  getTotalPrice: () => number;
  canProceedToNextStep: () => boolean;
  nextStep: () => void;
  prevStep: () => void;
  resetOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const getTotalPrice = () => {
    if (!state.selectedProduct || !state.selectedDesign) return 0;
    const basePrice = state.selectedProduct.price;
    const designPrice = state.selectedDesign.price;
    const totalPerItem = basePrice + designPrice;
    const finalTotal = totalPerItem * state.quantity;
    return Math.round(finalTotal * 100) / 100; // Round to 2 decimal places
  };

  const canProceedToNextStep = () => {
    switch (state.currentStep) {
      case 1: return !!state.selectedColor;
      case 2: return !!state.selectedSize;
      case 3: return !!state.selectedDesign;
      case 4: return state.quantity > 0;
      case 5: return !!state.customer?.name && !!state.customer?.phone && !!state.customer?.address;
      default: return false;
    }
  };

  const nextStep = () => {
    if (canProceedToNextStep() && state.currentStep < 6) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep + 1 });
    }
  };

  const prevStep = () => {
    if (state.currentStep > 1) {
      dispatch({ type: 'SET_STEP', payload: state.currentStep - 1 });
    }
  };

  const resetOrder = () => {
    dispatch({ type: 'RESET_ORDER' });
  };

  return (
    <OrderContext.Provider value={{
      state,
      dispatch,
      getTotalPrice,
      canProceedToNextStep,
      nextStep,
      prevStep,
      resetOrder,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};