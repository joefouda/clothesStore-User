import { Button, Popover } from 'antd';
import { useState } from 'react';
import { Badge } from 'antd';

const PopOver = (props) => {
  const [hovered, setHovered] = useState(false);

  const handleHoverChange = (visible) => {
    setHovered(visible);
  };
  const hoverContent = props.content || <div>This is hover content.This is hover content.This is hover content.This is hover content.This is hover content.</div>;
  return (
    <Popover
      content={hoverContent}
      trigger="hover"
      visible={hovered}
      placement="bottomRight"
      onVisibleChange={handleHoverChange}
    >   
        {props.for === 'cart'?<Badge count={0} offset={[0, 10]}>
            <Button>{props.title}</Button>
        </Badge>:<Button>{props.title}</Button>}
    </Popover>
  );
};

export default PopOver;