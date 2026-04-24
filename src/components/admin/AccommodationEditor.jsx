
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, BedDouble, GripVertical } from 'lucide-react';

/**
 * AccommodationEditor — Admin component
 *
 * Renders a visual row-builder for the accommodation table.
 * Outputs a JSON array to your form via onChange(jsonArray).
 *
 * Usage in your admin package form:
 *   <AccommodationEditor
 *     value={form.accommodation}
 *     onChange={(rows) => setForm({...form, accommodation: rows})}
 *   />
 *
 * Then when saving, store `JSON.stringify(form.accommodation)`
 * in the `accommodation` column (text/jsonb) in Supabase.
 *
 * Each row shape:
 * {
 *   city: string,
 *   nights: number,
 *   category_a: string,
 *   category_b: string,
 *   category_c: string,
 *   meal_plan: string,
 * }
 */

const EMPTY_ROW = {
  city: '',
  nights: '',
  cat_a: '',
  cat_b: '',
  cat_c: '',
  meal_plan: '',
};

const inputCls =
  'w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400';

const AccommodationEditor = ({ value, onChange }) => {
  const [rows, setRows] = useState(() => {
    if (Array.isArray(value) && value.length > 0) return value;
    if (value && typeof value === 'string') {
      try { const p = JSON.parse(value); return Array.isArray(p) ? p : [{ ...EMPTY_ROW }]; }
      catch { return [{ ...EMPTY_ROW }]; }
    }
    return [{ ...EMPTY_ROW }];
  });

  // Sync up on external value change
  useEffect(() => {
    if (Array.isArray(value) && value.length > 0) setRows(value);
  }, []);

  const update = (newRows) => {
    setRows(newRows);
    onChange && onChange(newRows);
  };

  const addRow = () => update([...rows, { ...EMPTY_ROW }]);

  const removeRow = (i) => {
    if (rows.length === 1) return; // keep at least one row
    update(rows.filter((_, idx) => idx !== i));
  };

  const setField = (i, key, val) => {
    const next = rows.map((r, idx) => idx === i ? { ...r, [key]: val } : r);
    update(next);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center">
            <BedDouble size={14} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-700 uppercase tracking-wider">Accommodation Options</p>
            <p className="text-[11px] text-slate-400">Add one row per city/location</p>
          </div>
        </div>
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wide rounded-lg hover:bg-[#0a1628] transition-all"
        >
          <Plus size={13} /> Add City
        </button>
      </div>

      {/* Column labels */}
      <div className="hidden sm:grid grid-cols-12 gap-2 px-1">
        <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">City</div>
        <div className="col-span-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Nights</div>
        <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category A</div>
        <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category B</div>
        <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Category C</div>
        <div className="col-span-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meal Plan</div>
        <div className="col-span-1" />
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {rows.map((row, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-blue-200 transition-all"
          >
            {/* Mobile: stacked, Desktop: grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-start">
              {/* City */}
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 sm:hidden">City</label>
                <input
                  placeholder="Port Blair"
                  className={inputCls}
                  value={row.city}
                  onChange={e => setField(i, 'city', e.target.value)}
                />
              </div>

              {/* Nights */}
              <div className="sm:col-span-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 sm:hidden">Nights</label>
                <input
                  type="number"
                  min="0"
                  placeholder="3"
                  className={inputCls + ' text-center'}
                  value={row.nights}
                  onChange={e => setField(i, 'nights', e.target.value)}
                />
              </div>

              {/* Category A */}
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 sm:hidden">Category A</label>
                <input
                  placeholder="Hotel Lemon Tree or similar"
                  className={inputCls}
                  value={row.category_a}
                  onChange={e => setField(i, 'category_a', e.target.value)}
                />
              </div>

              {/* Category B */}
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 sm:hidden">Category B</label>
                <input
                  placeholder="The Eden by Season or similar"
                  className={inputCls}
                  value={row.category_b}
                  onChange={e => setField(i, 'category_b', e.target.value)}
                />
              </div>

              {/* Category C */}
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 sm:hidden">Category C</label>
                <input
                  placeholder="Hotel Zone Connect or similar"
                  className={inputCls}
                  value={row.category_c}
                  onChange={e => setField(i, 'category_c', e.target.value)}
                />
              </div>

              {/* Meal Plan */}
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 sm:hidden">Meal Plan</label>
                <select
                  className={inputCls}
                  value={row.meal_plan}
                  onChange={e => setField(i, 'meal_plan', e.target.value)}
                >
                  <option value="">Select…</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Half Board">Half Board</option>
                  <option value="Full Board">Full Board</option>
                  <option value="All Inclusive">All Inclusive</option>
                  <option value="Room Only">Room Only</option>
                  <option value="CP">CP (Breakfast)</option>
                  <option value="MAP">MAP (Breakfast + Dinner)</option>
                  <option value="AP">AP (All Meals)</option>
                </select>
              </div>

              {/* Delete */}
              <div className="sm:col-span-1 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => removeRow(i)}
                  disabled={rows.length === 1}
                  title="Remove row"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* JSON preview (collapsible, for debugging) */}
      <details className="mt-2">
        <summary className="text-[11px] text-slate-400 font-bold uppercase tracking-wider cursor-pointer hover:text-slate-600 select-none">
          Preview JSON (stored in DB)
        </summary>
        <pre className="mt-2 bg-slate-50 border border-slate-200 rounded-xl p-4 text-[11px] text-slate-600 overflow-x-auto leading-relaxed">
          {JSON.stringify(rows, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default AccommodationEditor;