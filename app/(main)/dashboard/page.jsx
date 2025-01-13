import React from 'react'

import CreateAccountDrawer from '@/components/create-account-drawer'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { getUserAccount } from '@/actions/dashboard'
import { AccountCard } from './_components/account-card'

async function DashboardLayout () {
  const accounts = await getUserAccount();

  return (
    <div className='px-5'>
       {/* BUdget Progress */}


       {/* Overview */}


       {/* Account Grid */}
      <div className='grid gap-4 md:grid-cols-3 lg:grid-col-3'>
        <CreateAccountDrawer>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed mt-5">
              <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
                <Plus className='h-10 w-10 mb-2'/>
                <p className='text-sm font-medium'>Add New Account</p>
              </CardContent>            
            </Card> 
        </CreateAccountDrawer>

        {accounts.length > 0 &&
          accounts?.map((account) => (
            <AccountCard key={account.id} account={account} />
        ))}
      </div>
          


    </div>
  )
}

export default DashboardLayout
