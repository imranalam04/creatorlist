export default function RadioTogglers({ options, defaultValue, onChange }) {
    return (
        <div className="radio-togglers shadow">
            {options.map((option) => {
                return (
                    <div key={option.value}>
                    <label className="button" >
                        <input type="radio" onClick={ev => onChange(ev.target.value)} name="bgType" defaultChecked={defaultValue === option.value} value={option.value} />
                        <span>{option.label}</span>
                    </label>
                    </div>
                )
            })}

        </div>
    )
}