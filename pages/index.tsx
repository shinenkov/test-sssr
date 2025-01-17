import { useState } from "react";
import { CountriesType } from "../types/types";
import { useTransition } from "react-spring";
import useWindowSize from "@/hooks/useWindowSize";
import Countries from "@/components/main";

const heightItem = 40;

type IndexProps = {
  countries: CountriesType[] | null
}

export default function Index({ countries: data }: IndexProps) {
  const { width } = useWindowSize();
  const [countries, setCountries] = useState<CountriesType[]>(data || [])

  const transitions = useTransition(
    countries.map((data, i) => ({ ...data, y: i * heightItem })),
    {
      from: ({ y }) => ({ position: "absolute", opacity: 0, left: 32, y }),
      leave: { left: width ?? 750, config: { duration: 750 } },
      enter: ({ y }) => ({ y, opacity: 1 }),
      update: ({ y }) => ({ y, config: { duration: 400 } }),
      key: (item: CountriesType) => item?.name_ru,
    }
  );

  return (
    <Countries setCountries={setCountries} transitions={transitions} />
  );
}

export async function getServerSideProps() {
  const resp = await fetch(`${process.env.API_URL}/ISO3166_RU.json`)
  const countries: CountriesType[] = await resp.json()
  return { props: { countries } }
}


