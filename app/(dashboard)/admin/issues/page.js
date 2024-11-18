'use client';

import IssuesTable from "../../../components/Tables/IssuesTable";

export default function Page() {
  return (
    <div>
        <h1 className='font-bold text-2xl'>Issues</h1>
        <IssuesTable/>
    </div>
  );
}