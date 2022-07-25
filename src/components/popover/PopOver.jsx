import './Popover.css'
import { Popover } from 'antd';
import useToggle from '../../hooks/useToggleState';
import CategoryHoverContent from '../CategoryHoverContent/CategoryHoverContent'

const PopOver = (props) => {
  const [hovered, ToggleHovered] = useToggle(false);

  const hoverContent = <CategoryHoverContent category={props.category}/>;
  return (
    <Popover
      content={hoverContent}
      trigger="hover"
      visible={hovered}
      placement="bottomRight"
      onVisibleChange={ToggleHovered}
    >   
        <h1 className='nav-link' style={{fontFamily:'Source Sans Pro, sans-serif'}}>{props.title}</h1>
    </Popover>
  );
};

export default PopOver;