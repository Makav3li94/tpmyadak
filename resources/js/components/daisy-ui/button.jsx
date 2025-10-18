import Spinner from './spinner'

export default function Button(props) {
    const { type } = props

    const types = {
        default: '',
        neutral: 'btn-neutral',
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        ghost: 'btn-ghost',
        link: 'btn-link',
        //
        info: 'btn-info btn-outline',
        error: 'btn-error btn-outline',
        danger: 'btn-error text-base-100',
        success: 'btn-success text-base-100',
        warning: 'btn-warning',

        //
        only: '',
    }

    return (
        <button
            type={`${props.btnType ? props.btnType : 'button'}`}
            disabled={props.disabled || props.processing || false}
            onClick={props.onClick}
            className={`btn ${!type ? types.default : types[type]} ${
                props.className ? props.className : ''
            }`}
        >
            {props.processing ? (
                <>
                    <Spinner />
                    Loading
                </>
            ) : (
                props.children
            )}
        </button>
    )
}
