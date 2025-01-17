import { Dispatch, SetStateAction } from "react";
import styles from "../app/main.module.css";
import Image from "next/image";
import { animated, TransitionFn } from "react-spring";
import { CountriesType } from "../../types/types";

type CountriesProps = {
  transitions: TransitionFn<{
    y: number;
    flag_url: string;
    name_ru: string;
    iso_code2: string;
    iso_code3: string;
  }>
  setCountries: Dispatch<SetStateAction<CountriesType[]>>
}


export default function Countries({ transitions, setCountries }: CountriesProps) {
  return (
    <div className={styles.main}>
      <div className={styles.list}>
        {transitions(({ y, ...rest}, item) => (
          <animated.div
            key={item.iso_code3}
            style={{
              ...rest,
              transform: y.to((y: number) => `translate3d(0, ${y}px, 0)`),
            }}
          >
            <div className={styles.item}>
              <Image
                alt={item.name_ru}
                src={item.flag_url ? item.flag_url?.replace('//', 'https://') : 'https://example.com/error.jpg'}
                width={22}
                height={15}
                className={styles.flag}
              />
              <span>{item.name_ru}</span>
              <button
                onClick={() => 
                  setCountries((countries) => 
                    countries.filter((country) => country.iso_code3 !== item.iso_code3)
                  )
                }
                className={styles.delete}
              >
                Удалить
              </button>
            </div>
          </animated.div>
        ))}
        </div>
    </div>
  );
}