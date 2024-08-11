import MainComponent from "@/app/components/HomePage/MainComponent";

export const metadata = {
  title: 'Open Journal System - OJS',
  metadataBase: new URL('https://google.com'),
  description:
    'Open Journal System!',
  keyword: [
    'OJS',
    'Journal',
    'Open Journal System',
  ]
};

export default function Home() {
  return (
    <MainComponent/>
  )
}
