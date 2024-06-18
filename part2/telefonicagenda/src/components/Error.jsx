const Error = ({errorMessage}) => {
    const errorStyle = {
        color: 'red',
        fontStyle: 'italic',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
      }

    if (errorMessage === null){
        return null
    }

    return (
        <div style={errorStyle}>
            {errorMessage}
        </div>
    )
}

export default Error