import { Layout } from '@flowmoni/components/Layout';
import { useState } from 'react';

export const Calculator = (props: { onChange: (value: number) => void }) => {
  const [result, _setResult] = useState('');
  const [confirmBtn, setConfirmBtn] = useState(true);

  const ops = ['*', '/', '+', '-', '.'];
  const num = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '000', '.'];

  const setResult = (v: string) => {
    _setResult(v);

    const number = Number(v);
    setConfirmBtn(!isNaN(number));
  };

  const updateResult = (v: string) => {

    const lastChar = result[result.length - 1] ?? '';
    const n = (result + v).split(/[\+\-\*\/]/g);
    const lastNum = n[n.length - 1];

    if (v === '.' && (ops.includes(lastChar) || result === '')) {
      setResult(result + '0' + v);
    }
    if (v === '-' && result === '') {
      setResult(result + v);
    }

    // TODO: fix when user input 000000
    if (
      (ops.includes(v) && result === '') ||
      (ops.includes(v) && ops.includes(lastChar)) ||
      isNaN(Number(lastNum))
    ) {
      return;
    }

    setResult(result + v);
  };

  const handleClickEqual = () => {
    try {
      const res = Math.floor(eval(result) * 100) / 100;
      if (res === 0) {
        setResult('');
      } else {
        setResult(res.toString());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyboard = (event: any) => {
    const key = event.key;
    if (ops.includes(key) || num.includes(key)) updateResult(key);
    else if (key.includes('Backspace')) setResult(result.slice(0, -1));
    else if (key === 'c' || key === 'C') setResult('');
    else if (key === '=' || key.includes('Enter')) {
      if (confirmBtn) sentData();
      else handleClickEqual();
    }
  };

  const sentData = () => {
    //TODO
    console.log('Sent Data...' + result);
    props.onChange?.(Number(result));
  };

  return (
    <Layout className="bg-white">
      <div className="flex h-full w-full flex-col justify-end gap-1 text-lg">
        <input
          id="res"
          className="h-10 w-full px-3 text-left align-text-bottom text-xl font-semibold"
          onKeyDown={handleKeyboard}
          value={result || 0}
        />

        <div className="grid h-1/3 w-full grid-cols-4 grid-rows-5">
          <button
            className="border border-gray-200 bg-gray-300 font-semibold hover:bg-slate-300"
            onClick={() => {
              setResult('');
            }}
          >
            C
          </button>
          <button
            className="border border-gray-200 bg-gray-300 hover:bg-slate-300"
            onClick={() => updateResult('/')}
          >
            ÷
          </button>
          <button
            className="border border-gray-200 bg-gray-300 hover:bg-slate-300"
            onClick={() => updateResult('*')}
          >
            ×
          </button>
          <button
            className="border border-gray-200 bg-gray-300 font-semibold hover:bg-slate-300"
            onClick={() => {
              setResult(result.slice(0, -1));
            }}
          >
            DEL
          </button>
          {num.map((v) => (
            <button
              key={v}
              className="border border-gray-200 bg-gray-100 hover:bg-gray-200"
              onClick={() => updateResult(v)}
            >
              {v}
            </button>
          ))}
          <button
            className="col-start-4 row-start-2 border border-gray-200 bg-gray-300 hover:bg-slate-300"
            onClick={() => updateResult('-')}
          >
            -
          </button>
          <button
            className="col-start-4 row-start-3 border border-gray-200 bg-gray-300 hover:bg-slate-300"
            onClick={() => updateResult('+')}
          >
            +
          </button>
          {!confirmBtn ? (
            <button
              className="col-start-4 row-start-4 row-end-6 border border-gray-200 bg-green-500 font-semibold text-white hover:bg-green-400"
              onClick={handleClickEqual}
            >
              =
            </button>
          ) : (
            <button
              className="col-start-4 row-start-4 row-end-6 border border-gray-200 bg-blue-500 font-semibold text-white hover:bg-blue-400"
              onClick={sentData}
            >
              {'>'}
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};
