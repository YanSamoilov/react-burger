import { useEffect, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IFullTabProps } from 'services/types/data';


const FullTab = ({ bunHeadingRef, sauceHeadingRef, mainIngredientHeadingRef, value }: IFullTabProps) => {

  const [current, setCurrent] = useState(value);

  useEffect(() => setCurrent(value), [value]);

  return (
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={(value) => {
        setCurrent(value);
        bunHeadingRef.current?.scrollIntoView();
      }} >
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={(value) => {
        setCurrent(value);
        sauceHeadingRef.current?.scrollIntoView();
      }}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={(value) => {
        setCurrent(value);
        mainIngredientHeadingRef.current?.scrollIntoView();
      }}>
        Начинки
      </Tab>
    </div>
  )
}

export default FullTab
