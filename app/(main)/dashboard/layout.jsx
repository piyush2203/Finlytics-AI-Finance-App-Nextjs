import React, { Suspense } from 'react'
import DashboardLayout from './page'
import {BarLoader} from "react-spinners"


const Layout = () => {
  return (
    <div>
      <div className=" items-center justify-between mb-5 px-5">
        <h1 className="text-6xl font-bold tracking-tight gradient-title">
          Dashboard
        </h1>

        {/* Dashboard Page */}
        <Suspense >
            <DashboardLayout/>
        </Suspense>

      </div>
    </div>
  )
}

export default Layout
