import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { Header } from './components/Header.jsx';
import { DashboardView } from './components/DashboardView.jsx';
import { KatalogView } from './components/KatalogView.jsx';
import { ManajemenStokView } from './components/ManajemenStokView.jsx';
import { ProductModal } from './components/ProductModal.jsx';
import { DeleteModal } from './components/DeleteModal.jsx';
import { BuyModal } from './components/BuyModal.jsx';
import { VideoModal } from './components/VideoModal.jsx';
import { NotificationToast } from './components/NotificationToast.jsx';

import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './data/mockData.js';

export default function App() {
  const [currentTab, setCurrentTab] = useState('katalog-produk');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // --- PENCARIAN GLOBAL (di Header) ---
  // Nilai seketika saat mengetik. Setiap view (Katalog & ManajemenStok)
  // menerima nilai ini sebagai externalSearch dan menerapkan DEBOUNCE
  // sendiri lewat hook useProductTable.
  const [searchQuery, setSearchQuery] = useState('');

  // Main state: products & orders
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Cart / Shopping state
  const [cartCount, setCartCount] = useState(0);

  // Modals state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [productToBuy, setProductToBuy] = useState(null);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Toast Notifications State
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, type = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Handler: Add / Update Product
  const handleSaveProduct = (productData) => {
    if (productData.id) {
      // Edit existing product
      setProducts((prev) =>
        prev.map((p) => (p.id === productData.id ? { ...p, ...productData } : p))
      );
      addToast('Produk Diperbarui', `${productData.name} berhasil disimpan.`, 'success');
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: `prod-${Date.now()}`,
      };
      setProducts((prev) => [newProduct, ...prev]);
      addToast('Varian Baru Ditambahkan', `${newProduct.name} telah ada di katalog.`, 'success');
    }
  };

  // Handler: Quick Stock Update (+/-)
  const handleUpdateStock = (productId, delta) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStock = Math.max(0, p.stock + delta);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
  };

  // Handler: Delete Product
  const handleConfirmDelete = () => {
    if (!productToDelete) return;
    setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
    addToast('Varian Dihapus', `${productToDelete.name} telah dihapus dari sistem.`, 'error');
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  // Handler: Confirm Order Purchase
  const handleConfirmPurchase = (product, quantity, customerName) => {
    // 1. Reduce stock
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === product.id) {
          return { ...p, stock: Math.max(0, p.stock - quantity) };
        }
        return p;
      })
    );

    // 2. Add new order
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      productName: product.name,
      variant: product.weight,
      quantity,
      totalPrice: product.price * quantity + 10000,
      customerName,
      status: 'Diproses',
      date: 'Baru saja',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCartCount((c) => c + quantity);
    addToast(
      'Pesanan Berhasil!',
      `Terima kasih ${customerName}, pesanan ${product.name} sedang diproses dapur.`,
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-[#fff8f6] text-[#351000] font-['Be_Vietnam_Pro',sans-serif] flex flex-col">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Top Header Bar */}
      <Header
        onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        onOpenCart={() => {
          setCurrentTab('dashboard');
          addToast('Status Keranjang', `Anda memiliki ${cartCount} pesanan selesai hari ini.`, 'info');
        }}
      />

      {/* Main Container View Area */}
      <main className="lg:pl-72 pt-16 flex-1 flex flex-col">
        <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto flex-1">
          {currentTab === 'dashboard' && (
            <DashboardView
              products={products}
              orders={orders}
              onNavigateTab={setCurrentTab}
              onOpenAddModal={() => {
                setProductToEdit(null);
                setIsProductModalOpen(true);
              }}
            />
          )}

          {currentTab === 'katalog-produk' && (
            <KatalogView
              products={products}
              searchQuery={searchQuery}
              // onSearchChange dipakai tombol "Reset Filter" di KatalogView
              // untuk mengosongkan pencarian global di Header.
              onSearchChange={setSearchQuery}
              onSelectProductToBuy={(product) => {
                setProductToBuy(product);
                setIsBuyModalOpen(true);
              }}
              onOpenVideoModal={() => setIsVideoModalOpen(true)}
            />
          )}

          {currentTab === 'manajemen-stok' && (
            <ManajemenStokView
              products={products}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onOpenAddModal={() => {
                setProductToEdit(null);
                setIsProductModalOpen(true);
              }}
              onOpenEditModal={(product) => {
                setProductToEdit(product);
                setIsProductModalOpen(true);
              }}
              onOpenDeleteModal={(product) => {
                setProductToDelete(product);
                setIsDeleteModalOpen(false);
                setIsDeleteModalOpen(true);
              }}
              onUpdateStock={handleUpdateStock}
            />
          )}
        </div>
      </main>

      {/* Modals & Popups */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        product={productToDelete}
      />

      <BuyModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
        product={productToBuy}
        onConfirmPurchase={handleConfirmPurchase}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Floating Notifications */}
      <NotificationToast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
