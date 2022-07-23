import './PaymentMethodContent.css'
import { Radio } from 'antd';
import React from 'react';

const PaymentMethodContent = (props) => {
  const onChange = (e) => {
    props.setPaymentMethod(e.target.value);
  };

  return (
    <Radio.Group style={{display:'block', display:'flex', flexDirection:'column', gap:'10px'}} onChange={onChange} value={props.paymentMethod}>
      <Radio className='selected-payment payment' value={'Cash On Delivery'}>Cash On Delivery</Radio>
    </Radio.Group>
  );
};

export default PaymentMethodContent