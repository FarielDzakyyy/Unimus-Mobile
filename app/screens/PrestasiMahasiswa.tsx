import { Colors } from '@/constants/Colors';
import { prestaasiMahasiswa } from '@/db';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from "react";
import { Alert, Modal, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

type Prestasi = {
  id: number;
  namaKejuaraan: string;
  tingkat: string; // Nasional / International / Lokal
  juara: string;   // 1 / 2 / 3 / Lainnya
  penyelenggara: string;
};

const PrestasiMahasiswa = () => {
  const router = useRouter();
  // source data (in-memory – not persisted)
  const [items, setItems] = useState<Prestasi[]>(prestaasiMahasiswa as Prestasi[]);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Prestasi, 'id'>>({ namaKejuaraan: '', tingkat: '', juara: '', penyelenggara: '' });
  const [optionsId, setOptionsId] = useState<number | null>(null); // fallback long-press options

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(p =>
      p.namaKejuaraan.toLowerCase().includes(q) ||
      p.tingkat.toLowerCase().includes(q) ||
      p.juara.toLowerCase().includes(q) ||
      p.penyelenggara.toLowerCase().includes(q)
    );
  }, [items, query]);

  const resetForm = () => setForm({ namaKejuaraan: '', tingkat: '', juara: '', penyelenggara: '' });

  // load persisted data
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem('prestasi:data');
        if (raw) {
          const parsed: Prestasi[] = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length) {
            setItems(parsed);
          }
        }
      } catch (e) {
        console.warn('Gagal memuat data prestasi', e);
      }
    })();
  }, []);

  const persist = async (data: Prestasi[]) => {
    try {
      await AsyncStorage.setItem('prestasi:data', JSON.stringify(data));
    } catch (e) {
      console.warn('Gagal menyimpan data prestasi', e);
    }
  };

  const openAdd = () => {
    resetForm();
    setEditingId(null);
    setFormOpen(true);
  };

  const openEdit = (id: number) => {
    const found = items.find(i => i.id === id);
    if (!found) return;
    setForm({ namaKejuaraan: found.namaKejuaraan, tingkat: found.tingkat, juara: found.juara, penyelenggara: found.penyelenggara });
    setEditingId(id);
    setFormOpen(true);
  };

  const handleSubmit = () => {
    if (!form.namaKejuaraan || !form.tingkat || !form.juara || !form.penyelenggara) {
      Alert.alert('Data belum lengkap', 'Mohon lengkapi semua field.');
      return;
    }
    if (editingId == null) {
      setItems(prev => {
        const updated = [{ id: Date.now(), ...form }, ...prev];
        persist(updated);
        return updated;
      });
    } else {
      setItems(prev => {
        const updated = prev.map(p => p.id === editingId ? { ...p, ...form } : p);
        persist(updated);
        return updated;
      });
    }
    resetForm();
    setEditingId(null);
    setFormOpen(false);
  };

  const handleDelete = (id: number) => {
    Alert.alert('Hapus', 'Yakin ingin menghapus prestasi ini?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Hapus', style: 'destructive', onPress: () => {
        setItems(prev => {
          const updated = prev.filter(p => p.id !== id);
          persist(updated);
          return updated;
        });
        if (editingId === id) {
          setEditingId(null);
          resetForm();
        }
      }}
    ]);
  };


  return (
    <SafeAreaView className="flex-1 bg-bgColor-BLUE">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex flex-row items-center justify-between mt-8 p-5">
          <View className="flex-row items-center gap-3">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={24} color="white" />
            </TouchableOpacity>
            <Text className='text-white font-extrabold text-[16px]'>Prestasi Mahasiswa</Text>
          </View>
          {searchOpen ? (
            <View className="flex-row items-center bg-white/15 rounded-full px-3 py-1 flex-1 ml-4">
              <Feather name="search" size={18} color="white" />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Cari..."
                placeholderTextColor={'#ffffff88'}
                className="flex-1 ml-2 text-white"
                autoFocus
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => setQuery('')}>
                  <Ionicons name="close" size={18} color="white" />
                </TouchableOpacity>
              )}
              <TouchableOpacity className="ml-2" onPress={() => { setSearchOpen(false); setQuery(''); }}>
                <Ionicons name="arrow-forward" size={18} color="white" style={{ transform: [{ rotate: '180deg' }] }} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity className="p-2 rounded-full bg-white/10" onPress={() => setSearchOpen(true)}>
              <Feather name="search" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {/* List */}
        <View className="flex mt-5 bg-white rounded-t-3xl min-h-full">
          <View className='flex-row items-center justify-between  mt-5 mb-5 mx-4'>
            <Text className="text-black font-extrabold text-[18px]">
              Data Prestasi Mahasiswa
            </Text>
            <TouchableOpacity className="flex-row bg-primary p-2 gap-2 rounded-md" onPress={openAdd}>
              <Text className='text-white font-semibold'>Add</Text>
              <Feather name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
          {filtered.length === 0 && (
            <Text className='text-center text-gray-500 mb-4'>Tidak ada data.</Text>
          )}
          {filtered.map(item => (
            <TouchableOpacity key={item.id} activeOpacity={0.9} onLongPress={() => setOptionsId(item.id)} className="flex px-4 pt-2 mt-3">
              <View className="flex flex-col bg-primary gap-2 p-3 rounded-xl border border-primary">
                <View className="flex flex-row max-w-[100%] justify-between items-center">
                  <Text className="text-sm font-semibold text-black max-w-[50%]">
                    {item.penyelenggara}
                  </Text>
                  <View className='flex-row bg-yellowBG rounded-md p-1 gap-2 items-center'>
                    <FontAwesome5 name="award" size={15} color={Colors.primary} />
                    <Text className="text-md font-bold text-primary">{item.juara}</Text>
                  </View>
                  <Text className="text-sm font-semibold text-black">
                    {item.tingkat}
                  </Text>
                </View>
                <View className="w-full h-0.5 bg-primary" />
                <Text className="text-md font-normal text-bgColor-BLUE">
                  {item.namaKejuaraan}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal visible={formOpen} transparent animationType='fade'>
        <View className='flex-1 bg-black/50 justify-center px-6'>
          <View className='bg-white rounded-2xl p-5'>
            <Text className='text-lg font-bold text-black mb-4'>{editingId == null ? 'Tambah Prestasi' : 'Edit Prestasi'}</Text>
            <View className='mb-3'>
              <Text className='text-xs font-semibold mb-1 text-gray-600'>Nama Kejuaraan</Text>
              <TextInput value={form.namaKejuaraan} onChangeText={t=>setForm(f=>({...f,namaKejuaraan:t}))} placeholder='Nama Kejuaraan' className='border border-gray-300 rounded-md px-3 py-2' />
            </View>
            <View className='mb-3'>
              <Text className='text-xs font-semibold mb-1 text-gray-600'>Tingkat</Text>
              <TextInput value={form.tingkat} onChangeText={t=>setForm(f=>({...f,tingkat:t}))} placeholder='Nasional / International / Lokal' className='border border-gray-300 rounded-md px-3 py-2' />
            </View>
            <View className='mb-3'>
              <Text className='text-xs font-semibold mb-1 text-gray-600'>Juara</Text>
              <TextInput value={form.juara} onChangeText={t=>setForm(f=>({...f,juara:t}))} placeholder='1 / 2 / 3 / Lainnya' className='border border-gray-300 rounded-md px-3 py-2' />
            </View>
            <View className='mb-4'>
              <Text className='text-xs font-semibold mb-1 text-gray-600'>Penyelenggara</Text>
              <TextInput value={form.penyelenggara} onChangeText={t=>setForm(f=>({...f,penyelenggara:t}))} placeholder='Nama penyelenggara' className='border border-gray-300 rounded-md px-3 py-2' />
            </View>
            <View className='flex-row justify-end gap-3'>
              <Pressable onPress={()=>{setFormOpen(false); resetForm(); setEditingId(null);}} className='px-4 py-2 rounded-md bg-gray-200'>
                <Text className='text-gray-700 font-semibold'>Batal</Text>
              </Pressable>
              {editingId != null && (
                <Pressable onPress={()=> handleDelete(editingId)} className='px-4 py-2 rounded-md bg-red-500'>
                  <Text className='text-white font-semibold'>Hapus</Text>
                </Pressable>
              )}
              <Pressable onPress={handleSubmit} className='px-4 py-2 rounded-md bg-primary'>
                <Text className='text-white font-semibold'>{editingId == null ? 'Simpan' : 'Update'}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Options Modal (fallback for long press if swipe not used) */}
      <Modal visible={optionsId != null} transparent animationType='fade'>
        <View className='flex-1 bg-black/50 justify-center px-10'>
          <View className='bg-white rounded-2xl p-6'>
            <Text className='text-base font-bold mb-4'>Actions Modal</Text>
            <TouchableOpacity className='flex-row py-3 gap-3 items-center' onPress={()=>{ if(optionsId!=null) openEdit(optionsId); setOptionsId(null); }}>
              <FontAwesome6 name='edit' size={20} color={Colors.primary} />
              <Text className='text-primary font-semibold'>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-row py-3 gap-3 items-center' onPress={()=>{ if(optionsId!=null) handleDelete(optionsId); setOptionsId(null); }}>
              <MaterialCommunityIcons name="delete-empty-outline" size={24} color="red" />
              <Text className='text-red-500 font-semibold'>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-row py-3 gap-3 items-center' onPress={()=> setOptionsId(null)}>
              <FontAwesome5 name="window-close" size={24} color="gray" />
              <Text className='text-gray-600'>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PrestasiMahasiswa;
