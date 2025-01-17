import { getAccountWithTransactions } from '@/actions/accounts';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import TransactionTable from '../_components/transaction-table';
import { BarLoader } from 'react-spinners';
import AccountChart from '../_components/AccountChart';

const Account = async({params}) => {
    const { id } = await params; // Ensure `params` is awaited if it's asynchronous
    const accountData = await getAccountWithTransactions(id);

    if (!accountData) {
        notFound();
    }


    const {transactions, ...account} = accountData;
    return (
        <div className='mx-4' >
            <div className='space-y-8 px-5 flex gap-5 items-end justify-between'>
                <div>
                    <h1 className='text-5xl sm:text-6xl font-bold gradient-title capitalize'>{account.name}</h1>
                    <p className='text-muted-foreground'>{account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account</p>
                </div>

                <div className='flex flex-col items-end'>
                    <div className='text-2xl font-bold '>₹ {parseFloat(account.balance).toFixed(2)}</div>
                    <p className='text-sm text-muted-foreground'>{account._count.transactions} Transactions</p>
                </div>
            </div>
            



            {/* Chart Section */}
                <Suspense fallback={<BarLoader className='mt-4 ' width={"100%"} color='#933ea'/>}>
                    <AccountChart transactions={transactions} />
                </Suspense>


            {/* Transaction Table */}
            <Suspense fallback={<BarLoader className='mt-4' width={"100%"} color='#9333ea'/>}>
                
                <TransactionTable transactions={transactions}/>
            </Suspense>


        </div>
    )
}

export default Account;
