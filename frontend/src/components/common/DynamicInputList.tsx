import type { ChangeEvent } from 'react'

interface Props {
  label: string
  values: string[]
  setValues: (values: string[]) => void
  placeholder: string
}

const DynamicInputList = ({
  label,
  values,
  setValues,
  placeholder,
}: Props) => {
  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const updated = [...values]
    updated[index] = e.target.value
    setValues(updated)
  }

  const addField = () => {
    setValues([...values, ''])
  }

  const removeField = (index: number) => {
    const updated = values.filter((_, i) => i !== index)
    setValues(updated)
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      {values.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleChange(index, e)}
            placeholder={placeholder}
            className="flex-1 border p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => removeField(index)}
            className="text-red-500 text-sm"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addField}
        className="text-blue-600 text-sm font-medium"
      >
        + Add {label}
      </button>
    </div>
  )
}

export default DynamicInputList