import React, { Component } from 'react'
import {BrowserRouter, Route} from "react-router-dom";
 
import SupplierList from './component/Supplier/SupplierList'
import CreateSupplier from './component/Supplier/CreateSupplier';
import SupplierDetail from './component/Supplier/SupplierDetail';
import EditSupplier from './component/Supplier/EditSupplier';
import RequestedProduct from './component/Product Management/RequestedProduct';
import EditNewSupplierProduct from './component/Product Management/EditNewSupplierProduct';
import EditOldSupplierProduct from './component/Product Management/EditOldSupplierProduct';
import SupplierPayment from './component/Payment Management/SupplierPayment';
import EditNewSupplier from './component/Payment Management/EditNewSupplier';
import EditOldSupplierPay from './component/Payment Management/EditOldSupplierPay';

import UserProductList from './component/Product Management(user)/UserProductList';
import UserProductDetails from './component/Product Management(user)/UserProductDetails';
import UserDiscountList from './component/Discount Management(user)/UserDiscountList';
import UserDiscountDetails from './component/Discount Management(user)/UserDiscountDetails';
import OldSupplier from './component/Supplier/OldSupplier';

import Login from './component/Login/Login';
import UserLogin from './component/Login/UserLogin';
import Signup from './component/Signup/Signup';

import Home from './component/Home/Home';
import UserHome from './component/Home/UserHome';
import Create from './component/Create/Create';
import contact from './component/Contact Us/contact';

import OrderList from './component/Order/OrderList';
import CreateOrder from './component/Order/CreateOrder';
import EditOrder from './component/Order/EditOrder';
import OrderDetail from './component/Order/OrderDetail';
import RequestedOrder from './component/Delivery Management/RequestedOrder';
import EditRequestOrder from './component/Delivery Management/EditRequestOrder';
import InventoryOrders from './component/Product Management/InventoryOrders'

import productList from './component/Product Management/productList';
import CreateProduct from './component/Product Management/CreateProduct';
import EditProduct from './component/Product Management/EditProduct';
import ProductDetails from './component/Product Management/ProductDetails';

import CustomerList from './component/Customer Mangement/CustomerList';
import CreateCustomer from './component/Customer Mangement/CreateCustomer';
import EditCustomer from './component/Customer Mangement/EditCustomer';
import CustomerDetails from './component/Customer Mangement/CustomerDetails';
import UserCreateCustomer from './component/Customer Management(user)/UserCreateCustomer';
import UserCustomerList from './component/Customer Management(user)/UserCustomerList';
import UserCustomerDetails from './component/Customer Management(user)/UserCustomerDetails';

import HistoryList from './component/Transaction History/HistoryList';
import CreateHistory from './component/Transaction History/CreateHistory';
import EditHistory from './component/Transaction History/EditHistory';
import HistoryDetails from './component/Transaction History/HistoryDetails';


import PaymentList from './component/Payment Management/PaymentList';
import CreatePayment from './component/Payment Management/CreatePayment';
import EditPayment from './component/Payment Management/EditPayment';
import PaymentDetails from './component/Payment Management/PaymentDetails';


import DiscountList from './component/Discount Management/DiscountList';
import CreateDiscount from './component/Discount Management/CreateDiscount';
import EditDiscount from './component/Discount Management/EditDiscount';
import DiscountDetails from './component/Discount Management/DiscountDetails';
import UserCreateOrder from './component/Order Management(user)/UserCreateOrder';
import UserPayment from './component/Payment Management(user)/UserPayment';
import PaymentForm from './component/Payment Management(user)/PaymentForm';
import AddPost from './component/Product Management(user)/AddPost';



import DeliveryList from './component/Delivery Management/DeliveryList';
import CreateDelivery from './component/Delivery Management/CreateDelivery';
import EditDelivery from './component/Delivery Management/EditDelivery';
import EditOldSupplier from './component/Supplier/EditOldSupplier';
import OldSupplierDetail from './component/Supplier/OldSupplierDetail';
import DeliveryDetail from './component/Delivery Management/DeliveryDetail';
import getOrder from './component/Order Management(user)/getOrder';
import Feedbackk from './component/Feedback management/Feedbackk';
import EditInventoryOrders from './component/Product Management/EditInventoryOrders';





export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        
         {/* Ushan Mihiranga (Supplier Management) */}
        <Route path="/admin" exact component={Login}></Route>
        <Route path="/" exact component={UserLogin}></Route>
        <Route path="/sign" exact component={Signup}></Route>
        <Route path="/home" exact component={Home}></Route>
        <Route path="/userHome" exact component={UserHome}></Route>
        <Route path="/create" component={Create}></Route>
        <Route path="/contact" component={contact}></Route>
        <Route path="/Old_Supplier" component={OldSupplier}></Route>
        <Route path="/editOldSupplier/:id" component={EditOldSupplier}></Route>
        <Route path="/view/Oldsupplier/:id" component={OldSupplierDetail}></Route>
        <Route path="/RequestedProduct" component={RequestedProduct}></Route>
        <Route path="/edit/new/supplier/:id" component={EditNewSupplierProduct}></Route>
        <Route path="/edit/old/supplier/:id" component={EditOldSupplierProduct}></Route>
        <Route path="/SupplierPayment" component={SupplierPayment}></Route>
        <Route path="/edit/new/payment/:id" component={EditNewSupplier}></Route>
        <Route path="/edit/old/payment/:id" component={EditOldSupplierPay}></Route>
        
       

        <Route path="/userproduct" exact component={UserProductList}></Route>
        <Route path="/userproduct/:id" component={UserProductDetails}></Route>
        <Route path="/userdiscount" exact component={UserDiscountList}></Route>
        <Route path="/userdiscount/:id" component={UserDiscountDetails}></Route>

        <Route path="/supplier" exact component={SupplierList}></Route>
        <Route path="/add/supplier" component={CreateSupplier}></Route>
        <Route path="/editsupplier/:id" component={EditSupplier}></Route>
        <Route path="/supplier/:id" component={SupplierDetail}></Route>

          {/* Lashini Jayasooriya (Order Management) */}
        <Route path="/order" exact component={OrderList}></Route>
        <Route path="/add/order" component={CreateOrder}></Route>
        <Route path="/editorder/:id" component={EditOrder}></Route>
        <Route path="/order/:id" component={OrderDetail}></Route>
        <Route path="/user/add/order" component={UserCreateOrder}></Route>
        <Route path="/user/order" exact component={getOrder}></Route>
        <Route path="/requeste/order" exact component={RequestedOrder}></Route>
        <Route path="/edit/request/order/:id" component={EditRequestOrder}></Route>
        <Route path="/inventory/requeste/order" component={InventoryOrders}></Route>
        <Route path="/edit/inventory/order/:id" component={EditInventoryOrders}></Route>
     

          {/* Rashmika Ranashinha (Inventory Management) */}
        <Route path="/product" exact component={productList}></Route>
        <Route path="/add/product" component={CreateProduct}></Route>
        <Route path="/editproduct/:id" component={EditProduct}></Route>
        <Route path="/product/:id" component={ProductDetails}></Route>
        <Route path="/user/add/product" component={AddPost}></Route>
        
          {/* Rashini Weerawardane (Customer Management) */}
        <Route path="/customer" exact component={CustomerList}></Route>
        <Route path="/add/customer" component={CreateCustomer}></Route>
        <Route path="/editcustomer/:id" component={EditCustomer}></Route>
        <Route path="/customer/:id" component={CustomerDetails}></Route>
        <Route path="/add/usercustomer" component={UserCreateCustomer}></Route>
        <Route path="/usercustomer" exact component={UserCustomerList}></Route>
        <Route path="/usercustomer/:id" component={UserCustomerDetails}></Route>

          {/* Samadhi Jayasundara (Transaction History) */}
        <Route path="/history" exact component={HistoryList}></Route>
        <Route path="/add/history" component={CreateHistory}></Route>
        <Route path="/edithistory/:id" component={EditHistory}></Route>
        <Route path="/history/:id" component={HistoryDetails}></Route>

          {/* Haritha Lidapitiya (####) */}
        <Route path="/discount" exact component={DiscountList}></Route>
        <Route path="/add/discount" component={CreateDiscount}></Route>
        <Route path="/editdiscount/:id" component={EditDiscount}></Route>
        <Route path="/discount/:id" component={DiscountDetails}></Route>
        <Route path="/Feedbackk" component={Feedbackk}></Route>

          {/* Dulaj Indula (Payment Management) */}
        <Route path="/payment" exact component={PaymentList}></Route>
        <Route path="/add/payment" component={CreatePayment}></Route> 
        <Route path="/editpayment/:id" component={EditPayment}></Route> 
        <Route path="/payment/:id" component={PaymentDetails}></Route>
        <Route path="/user/payment" exact component={UserPayment}></Route>
        <Route path="/user/payment/form" exact component={PaymentForm}></Route>

        {/* Ridmi Ranashinha (Delivery Management) */}
        <Route path="/delivery" exact component={DeliveryList}></Route>
        <Route path="/add/delivery" component={CreateDelivery}></Route>
        <Route path="/editdelivery/:id" component={EditDelivery}></Route> 
        <Route path="/delivery/:id" component={DeliveryDetail}></Route>
       
    </BrowserRouter>
  
      </div>
    )
  }
}

