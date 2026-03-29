import { useCount } from '../context/CounterProvider';
import Button from './Button';

const ButtonGroup = () => {
    const { handleIncrement, handleDecrement } = useCount();

    return (
        <div>
            <Button onClick={handleIncrement} text='+1 증가'></Button>
            <Button onClick={handleDecrement} text='-1 감소'></Button>
        </div>
    );
};

export default ButtonGroup;