// Icon re-exports for consistent theming
// Using Lucide React icons with consistent naming
export {
  // Navigation & UI
  Home as HomeIcon,
  ShoppingCart as ShoppingCartIcon,
  Heart as HeartIcon,
  Star as StarIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  Grid as GridIcon,
  List as ListIcon,
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  
  // User & Profile
  User as UserIcon,
  Bell as BellIcon,
  
  // Theme
  Sun as SunIcon,
  Moon as MoonIcon,
  
  // Commerce
  CreditCard as CreditCardIcon,
  Truck as TruckIcon,
  Shield as ShieldIcon,
  Check as CheckIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  Trash2 as Trash2Icon,
  
  // Fashion & Beauty
  Shirt as ShirtIcon,
  Sparkles as SparklesIcon,
  Brush as BrushIcon,
  Smile as SmileIcon,
  
  // Tech
  Smartphone as SmartphoneIcon,
  Globe as GlobeIcon,
  Lock as LockIcon,
} from 'lucide-react';

// Default icon props for consistency
export const iconProps = {
  size: 20,
  strokeWidth: 1.5,
} as const;

// Icon variants for different contexts
export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;