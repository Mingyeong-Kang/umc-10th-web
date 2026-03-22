const List = (props) : Element => {
    console.log(props)
    return (
        <li>
            {props.tech}
        </li>
    )
}

export default List