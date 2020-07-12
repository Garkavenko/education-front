// ts-nocheck
/* eslint-disable */
// TODO refactor
import React, { useState } from 'react';
import styles from './styles.module.css';
import Button from '@material-ui/core/Button';
import AbstractInput from '../AbstractInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import useQuery from "../../hooks/useQuery";
import {getUrl} from "../../utils";

function variablesToState(variables) {
  return variables.reduce((acc, item) => {
    acc[item] = null;
    return acc;
  }, {});
}

function getTable(height, width) {
  return [...Array(height || 1)].map(() => [...Array(width || 1)].fill(0));
}

function replaceEmptyStringsToZero(data) {
  return JSON.parse(JSON.stringify(data), (key, value) => {
    if (value === '') return 0;
    return value;
  });
}

function TaskInfo({ task }) {
  const inputSchema = JSON.parse(task.input_schema);
  const [state, setState] = useState(variablesToState(inputSchema.variables));
  const [resolveData, fetchResolveData] = useQuery(getUrl(task.url), { method: 'post' });
  function getValue(field) {
    if (state[field.variable] === undefined || state[field.variable] === null) {
      if (field.type === 'Array') {
        return [...Array(field.length || 1)].fill(0);
      }
      if (field.type === 'Table') {
        return getTable(state[field.height], state[field.width]);
      }
      return 0;
    }
    return state[field.variable];
  }

  function renderAnswer() {
    if (Array.isArray(resolveData?.data)) {
      const renderData = [<div key={0} className={styles.answerBlock}><Divider /></div>];
      resolveData.data.map(item => {
        if (item.text && !item.table && !item.array) {
          renderData.push(<div key={1} className={styles.answerBlock}><h7>{item.text}</h7></div>);
        }
        if (item.table) {
          renderData.push(
            <div key={2} className={styles.answerBlock}>
              <AbstractInput
                type="Table"
                value={item.table}
                name={item.text}
                setValue={() => null}
                height={item.table.length}
                width={item.table[0]?.length}
              />
            </div>,
          );
        }
        if (item.array) {
          renderData.push(
            <div key={3} className={styles.answerBlock}>
              <AbstractInput
                type="Array"
                value={item.array}
                name={item.text}
                setValue={() => null}
                length={item.array.length}
              />
            </div>,
          );
        }
      });
      return renderData;
    }
    return null;
  }
  return (
    <div style={{ overflow: 'auto' }}>
      <p className={styles.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flex: 1 }}>{task.name}</div>
        {/* <Button variant="contained" color="primary">Сгенерировать задачу</Button>*/}
      </p>
      <Divider />
      {!!task.description && (
        <div style={{ margin: '20px 0' }}>
          <h7>{task.description}</h7>
        </div>
      )}
      <Divider />
      <p className={styles.title}>
        Расчет
      </p>
      {
        inputSchema.fields.map((field, index) => (
          <AbstractInput
            key={index}
            inputType={field.inputType}
            name={field.name}
            maxValue={field.maxValue}
            setValue={(value, index, additionalIndex) => {
              if (field.type === 'CheckBox') {
                setState(prevValue => ({
                  ...prevValue,
                  [field.variable]: value,
                }));
                return;
              }
              if (field.type === 'Array') {
                setState(prevValue => {
                  let newValue = prevValue[field.variable] || [...Array(field.length || 1)].fill(0);
                  newValue = [...newValue];
                  newValue[index] = Number.isNaN(parseInt(value, 10)) ? '' : parseInt(value, 10);
                  return {
                    ...prevValue,
                    [field.variable]: newValue,
                  };
                });
                return;
              }
              if (field.type === 'Table') {
                setState(prevValue => {
                  let newValue = prevValue[field.variable] || getTable(prevValue[field.height], prevValue[field.width]);
                  newValue = [...newValue];
                  if (!newValue[index]) {
                    newValue = [...newValue, ...getTable(index - newValue.length, prevValue[field.width])];
                  }
                  newValue[index][additionalIndex] = Number.isNaN(parseInt(value, 10)) ? '' : parseInt(value, 10);
                  return {
                    ...prevValue,
                    [field.variable]: newValue,
                  };
                });
                return;
              }
              setState(prevValue => ({
                ...prevValue,
                [field.variable]: Number.isNaN(parseInt(value, 10)) ? '' : parseInt(value, 10),
              }));
            }}
            type={field.type}
            value={getValue(field)}
            height={state[field.height] || 1}
            length={state[field.length] || 1}
            width={state[field.width] || 1}
          />
        ))
      }
      <Button onClick={() => {
        fetchResolveData({data: replaceEmptyStringsToZero(state)});
      }} variant="contained" color="primary">Получить ответ</Button>
      {!!resolveData?.loading && (
        <div style={{ margin: '20px 0' }}>
          <CircularProgress />
        </div>
      )}
      {
        !!resolveData?.error && (
          <div style={{ margin: '20px 0' }}>
            <h4>Произошла ошибка.</h4>
          </div>
        )
      }
      <div>
        {renderAnswer()}
      </div>
    </div>
  );
}

export default TaskInfo;
