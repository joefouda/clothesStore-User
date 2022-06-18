import { SmileOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import React from 'react';

const CartPreview = () => (
    <Empty
        description={
            <span>
                Your Cart is Empty
            </span>
        }
    >
    </Empty>
);

export default CartPreview;