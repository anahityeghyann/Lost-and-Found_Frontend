import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import TopBar from '../components/layout/TopBar';
import PostNavbar from '../components/layout/PostNavbar';
import ProgressSteps from '../components/post/ProgressSteps';
import TypeStep from '../components/post/TypeStep';
import DetailsStep from '../components/post/DetailsStep';
import LocationStep from '../components/post/LocationStep';
import ContactStep from '../components/post/ContactStep';
import LivePreview from '../components/post/LivePreview';
import SuccessModal from '../components/post/SuccessModal';
import { createItem } from '../services/itemsApi';

const TOTAL_STEPS = 4;

const initialForm = () => ({
  title: '',
  category: '',
  description: '',
  offerReward: false,
  reward: '',
  urgent: false,
  city: '',
  area: '',
  locationDetail: '',
  date: new Date().toISOString().split('T')[0],
  time: '',
  name: '',
  phone: '',
  email: '',
  contactMethod: 'phone',
  terms: false,
});

export default function PostItemPage() {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [itemType, setItemType] = useState('lost');
  const [form, setForm] = useState(initialForm);
  const [photos, setPhotos] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get('type') === 'found') setItemType('found');
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateStep = (step) => {
    const formEl = document.getElementById(`step-${step}`);
    if (!formEl) return true;
    const required = formEl.querySelectorAll('[required]');
    for (const el of required) {
      if (!el.checkValidity()) {
        el.reportValidity();
        el.focus();
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validateStep(4)) return;
    try {
      const data = await createItem({form, itemType, photos})
      console.log('Successfully published item: ', data);
      setShowSuccess(true)
      
    } catch(error){
      if (error.data) {
        console.error("django validation errors", error.data)
      }else{
        console.error('Network error while posting:', error);
        
      }
    }
  };

  const handlePostAnother = () => {
    setShowSuccess(false);
    setForm(initialForm());
    setPhotos([]);
    setItemType('lost');
    setCurrentStep(1);
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-slate-50 text-slate-800 font-sans antialiased min-h-screen flex flex-col">
      <TopBar />
      <PostNavbar />
      <ProgressSteps currentStep={currentStep} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div id="step-1" className={currentStep === 1 ? '' : 'hidden'}>
                <TypeStep itemType={itemType} onTypeChange={setItemType} />
              </div>
              <div id="step-2" className={currentStep === 2 ? '' : 'hidden'}>
                <DetailsStep
                  form={form}
                  itemType={itemType}
                  onChange={handleChange}
                  photos={photos}
                  onPhotosChange={setPhotos}
                  onRemovePhoto={handleRemovePhoto}
                />
              </div>
              <div id="step-3" className={currentStep === 3 ? '' : 'hidden'}>
                <LocationStep form={form} onChange={handleChange} />
              </div>
              <div id="step-4" className={currentStep === 4 ? '' : 'hidden'}>
                <ContactStep form={form} onChange={handleChange} />
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-100 transition"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}
                <div className="flex-1" />
                {currentStep < TOTAL_STEPS ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/25 transition"
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/25 transition"
                  >
                    Publish Listing
                  </button>
                )}
              </div>
            </form>
          </div>

          <LivePreview itemType={itemType} form={form} photos={photos} />
        </div>
      </main>

      <SuccessModal open={showSuccess} onPostAnother={handlePostAnother} />
    </div>
  );
}
