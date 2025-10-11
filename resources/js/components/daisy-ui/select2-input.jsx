import { forwardRef } from 'react'
import Label from './label'
import TextInputError from './text-input-error'
import Select from 'react-select';

/**
 * Example :
 * <TextInput
 *     name={input.name}
 *     value={input.value}
 *     label={input.name}
 *     onChange={(e) => onChange(input, e.target.value)}
 * />
 *
 */
const Selec2Input = forwardRef((props, ref) => {
    const { label, error, ...inputProps } = props

    const defaultClassName = ` w-full bg-accent px-0 input  h-full`

    const errorClassName = `my-2 input input-error w-full`

    const className = error ? errorClassName : defaultClassName
    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: "#fff",
            fontSize:14,

            // match with the menu
            borderRadius: state.isFocused ? "0.5rem" : "0",
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "#3730a3" : "#bdbdbd",
            // Removes weird border around container
            // outlineStyle: state.isFocused ? 'solid'  : 'unset',
            // outlineWidth: state.isFocused ? '2px'  : 'unset',
            outlineOffset: state.isFocused ? '2px'  : 'unset',
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                // Overwrittes the different states of border
                borderColor: state.isFocused ? "unset" : "unset"
            },
            menu: (provided, state) => {
                return {
                    ...provided,
                    zIndex: 9999,
                    margin:10,
                    height: 200,
                    fontSize:14
                }
            },

            menuPortal: base => ({ ...base, zIndex: 9999 })
            // menuPortal: base => ({ ...base, zIndex: 9999 }),
            // menu: (provided, state) => {
            //     return {
            //         ...provided,
            //         zIndex: 9999,
            //         margin:10,
            //         height: 200,
            //         fontSize:14
            //     }
            //     },

        }),

    };

    return (
        <fieldset className="fieldset">
            <Label label={label} />
            <Select  options={props.options} styles={customStyles} placeholder={`انتخاب ${props.placeHolder?props.placeHolder:label}`}

                // ref={ref}   {...inputProps} className={`mf-select-con mt-2 w-full text-12 md:text-16  ${className} ${props.className ? props.className : ''}`}/>
                     ref={ref}   {...inputProps} className={`mf-select-con  w-full   ${props.className ? props.className : ''}`}/>
            <TextInputError error={error} />
        </fieldset>
    )
})

export default Selec2Input
