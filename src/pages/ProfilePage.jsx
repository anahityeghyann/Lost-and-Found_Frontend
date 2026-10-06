import React, { useState } from 'react';
import ProfileNavbar from '../components/layout/ProfileNavbar';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import PersonalInfoTab from '../components/profile/PersonalInfoTab';
import SavedItemsTab from '../components/profile/SavedItemsTab';
import { getImageUrl } from '../services/authApi';
import MyListingsTab from '../components/profile/MyListingsTab';

export default function ProfilePage() {
  const savedUser = localStorage.getItem('user');
  const user = savedUser ? JSON.parse(savedUser) : null;
  const token = localStorage.getItem('token');

  const [activeTab, setActiveTab] = useState('personal_info');
  const [avatarPreview, setAvatarPreview] = useState(getImageUrl(user?.avatar_url || user?.avatar || ''));

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <ProfileNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar Component */}
          <ProfileSidebar 
            user={user} 
            token={token} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            avatarPreview={avatarPreview}
            setAvatarPreview={setAvatarPreview}
          />

          {/* Right Main Content Tabs */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            {activeTab === 'personal_info' && <PersonalInfoTab user={user} token={token} />}
            {activeTab === 'saved_items' && <SavedItemsTab token={token} />}
            {activeTab === 'my_listings' && <MyListingsTab token={token} />}
          </section>

        </div>
      </main>
    </div>
  );
}