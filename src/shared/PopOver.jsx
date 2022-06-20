import { Button, Popover } from 'antd';
import { useState } from 'react';
import { Badge } from 'antd';
import CategoryHoverContent from '../components/CategoryHoverContent/CategoryHoverContent'
import { useNavigate } from 'react-router-dom';

const PopOver = (props) => {
  const navigate = useNavigate();
  console.log(props.category)
  const [hovered, setHovered] = useState(false);

  const handleHoverChange = (visible) => {
    setHovered(visible);
  };
  const hoverContent = props.content || <CategoryHoverContent category={props.category}/>;
  return (
    <Popover
      content={hoverContent}
      trigger="hover"
      visible={hovered}
      placement="bottomRight"
      onVisibleChange={handleHoverChange}
    >   
        {props.for === 'cart'?<Badge count={0} offset={[0, 10]}>
            <Button onClick={() => navigate(`/filter/${props.category.name}`)}>{props.title}</Button>
        </Badge>:<Button onClick={() => navigate(`/filter/${props.category.name}`)}>{props.title}</Button>}
    </Popover>
  );
};

export default PopOver;