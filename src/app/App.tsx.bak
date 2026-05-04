import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AppProvider, useAppContext } from './context';

const ThemeManager = () => {
  const { siteSettings } = useAppContext();

  useEffect(() => {
    document.title = siteSettings.title;
  }, [siteSettings.title]);

  const backgroundThemes = {
    default: {
      type: 'color',
      value: '#060813'
    },
    abstract: {
      type: 'image',
      value: 'url(https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1920&q=80)'
    },
    nature: {
      type: 'image',
      value: 'url(https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80)'
    },
    lofi: {
      type: 'image',
      value: 'url(https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=1920&q=80)'
    },
    focus: {
      type: 'image',
      value: 'url(https://images.unsplash.com/photo-1497215848521-f0fa800b40eb?auto=format&fit=crop&w=1920&q=80)'
    },
    geometric: {
      type: 'image',
      value: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80)'
    },
    synthwave: {
      type: 'image',
      value: 'url(https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&w=1920&q=80)'
    },
    watercolor: {
      type: 'image',
      value: 'url(https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=1920&q=80)'
    },
    minimalist: {
      type: 'color',
      value: '#f8fafc'
    },
    cyberpunk: {
      type: 'image',
      value: 'url(https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1920&q=80)'
    },
    space: {
      type: 'image',
      value: 'url(https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1920&q=80)'
    },
    anime_sky: {
      type: 'image',
      value: 'url(https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80)'
    }
  };

    const currentTheme = backgroundThemes[siteSettings.backgroundTheme as keyof typeof backgroundThemes] || backgroundThemes.default;

  const cssColors = `
    :root {
      --color-indigo-400: ${siteSettings.primaryColor}cc;
      --color-indigo-500: ${siteSettings.primaryColor};
      --color-indigo-600: ${siteSettings.primaryColor}e6;
    }
    
    * {
      font-family: ${siteSettings.fontFamily} !important;
    }

    body {
      ${currentTheme.type === 'image' 
        ? `background: ${currentTheme.value} center/cover fixed no-repeat !important;` 
        : `background-color: ${currentTheme.value} !important;`}
    }

    ${siteSettings.themeMode === 'light' ? `
      html { filter: invert(1) hue-rotate(180deg); }
      body { background-color: #f8fafc !important; }
      img, video, canvas { filter: invert(1) hue-rotate(180deg); }
      /* Prevent double invert on specific elements if needed */
      .exclude-invert { filter: invert(1) hue-rotate(180deg); }
    ` : ''}
  `;

  return <style>{cssColors}</style>;
};

export default function App() {
  return (
    <AppProvider>
      <ThemeManager />
      <RouterProvider router={router} />
    </AppProvider>
  );
}
