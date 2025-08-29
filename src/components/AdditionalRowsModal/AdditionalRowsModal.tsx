import { useRef } from 'react';

const EXTRA_COLUMNS = [
  'nitrous_oxide',
  'nitrous_oxide_per_capita',
  'share_global_cumulative_luc_co2',
  'share_global_luc_co2',
  'temperature_change_from_ch4',
  'temperature_change_from_n2o',
  'total_ghg',
];

type Props = {
  setShowModal: (showModal: boolean) => void;
  setExtraColumns: (extraColumns: string[]) => void;
  extraColumns: string[];
};
export default function AdditionalRowsModal({
  setShowModal,
  setExtraColumns,
  extraColumns,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const applyExtraColumns = () => {
    const checkedInputs = Array.from(
      formRef.current?.querySelectorAll<HTMLInputElement>(
        'input[type="checkbox"]:checked'
      ) ?? []
    );
    setExtraColumns(checkedInputs.map((input) => input.value));
    setShowModal(false);
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40"></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-lg font-semibold mb-4">Select Extra Columns</h2>
          <form ref={formRef} className="space-y-2">
            {EXTRA_COLUMNS.map((col) => (
              <label key={col} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={col}
                  defaultChecked={extraColumns.includes(col)}
                />
                <span>{col}</span>
              </label>
            ))}

            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={applyExtraColumns}
                className="px-4 py-2 bg-blue-300 mr-2 rounded-lg hover:bg-gray-400 transition"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
