import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/useAuthStore';
import OrderList from '../components/profile/OrderList';
import UserInfo from '../components/profile/UserInfo';
import { Tabs, TabList, Tab, TabPanel } from '../components/ui/Tabs';

export default function Profile() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('orders');

  if (!user) {
    return null; // Protected route should handle this
  }

  return (
    <>
      <Helmet>
        <title>{t('profile.title')} - Sluff</title>
        <meta name="description" content="View your Sluff profile and orders" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">{t('profile.title')}</h1>

        <Tabs selectedTab={activeTab} onChange={setActiveTab}>
          <TabList className="border-b border-gray-200 mb-8">
            <Tab
              id="orders"
              className="px-4 py-2 font-medium text-sm mr-4 border-b-2 -mb-px"
              activeClassName="text-black border-black"
              inactiveClassName="text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            >
              {t('profile.tabs.orders')}
            </Tab>
            <Tab
              id="info"
              className="px-4 py-2 font-medium text-sm border-b-2 -mb-px"
              activeClassName="text-black border-black"
              inactiveClassName="text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            >
              {t('profile.tabs.info')}
            </Tab>
          </TabList>

          <TabPanel id="orders">
            <OrderList />
          </TabPanel>

          <TabPanel id="info">
            <UserInfo user={user} />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}