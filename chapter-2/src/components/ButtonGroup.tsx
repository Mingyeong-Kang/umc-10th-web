import Button from './Button';

interface ButtonGroupProps {
    handleIncrement: () => void;
    handleDecrement: () => void;
}

const ButtonGroup = ({
    handleIncrement,
    handleDecrement,
}: ButtonGroupProps) => {
    return (
        <div>
            {/*Button 함수 호출, 매개변수로 onClick 함수와 string 변수를 props에 담아 전달*/}
            <Button onClick={handleIncrement} text="+1 증가"/>
            <Button onClick={handleDecrement} text="-1 감소"/>
        </div>
    );
};

export default ButtonGroup