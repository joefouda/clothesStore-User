import './Popover.css'
import { Popover } from 'antd';
import useToggle from '../../../hooks/useToggleState';
import CategoryHoverContent from './CategoryHoverContent/CategoryHoverContent'

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
        <span className='nav-link'>{props.title}</span>
    </Popover>
  );
};

export default PopOver;