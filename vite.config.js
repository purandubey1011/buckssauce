import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build:{
    rollupOptions:{
      input:{
        home:resolve(import.meta.dirname,'index.html'),shop:resolve(import.meta.dirname,'shop.html'),product:resolve(import.meta.dirname,'product.html'),about:resolve(import.meta.dirname,'about.html'),wholesale:resolve(import.meta.dirname,'wholesale.html'),faq:resolve(import.meta.dirname,'faq.html'),contact:resolve(import.meta.dirname,'contact.html'),checkout:resolve(import.meta.dirname,'checkout.html'),'404':resolve(import.meta.dirname,'404.html')
      }
    }
  }
});
