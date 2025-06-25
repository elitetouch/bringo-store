'use client'
import React from 'react'
import { Button, Text, Box } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Main_Subscription from './Main_Subscription'
import Billing_History from './Billing_History'
function Subscrption() {
  return (
    <div>
        <Box className=' lg:pl-[10px] pl-[5px] pr-[5px] lg:pr-[10px] pt-[10px]'>
            <Tabs>
  <TabList backgroundColor={'white'} height={'56px'}>
    <Tab>Subscription</Tab>
    <Tab>Billing History</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
     <Main_Subscription />
    </TabPanel>
    <TabPanel>
     <Billing_History />
    </TabPanel>
  </TabPanels>
</Tabs>
        </Box>
    </div>
  )
}

export default Subscrption