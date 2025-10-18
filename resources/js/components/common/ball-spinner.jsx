export default function BallSpinner({message = 'لطفا منتظر بمانید ...'}) {
    return (
        <div className="spinner mt-1">
            <div className="bounce1"/>
            <div className="bounce2"/>
            <div className="bounce3"/>
            <br/>
            <span className="fs-8">{message}</span>
        </div>

    );
}
