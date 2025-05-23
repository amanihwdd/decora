// Mock data for Algerian wilayas and pickup offices

export type Wilaya = {
  id: number
  name: string
  doorToDoorPrice: number
  officePickupPrice: number
}

export type PickupOffice = {
  id: string
  officeName: string
  address: string
  wilayaId: number
}

export const wilayas: Wilaya[] = [
  { id: 1, name: "Adrar", doorToDoorPrice: 1200, officePickupPrice: 800 },
  { id: 2, name: "Chlef", doorToDoorPrice: 800, officePickupPrice: 500 },
  { id: 3, name: "Laghouat", doorToDoorPrice: 1000, officePickupPrice: 700 },
  { id: 4, name: "Oum El Bouaghi", doorToDoorPrice: 900, officePickupPrice: 600 },
  { id: 5, name: "Batna", doorToDoorPrice: 850, officePickupPrice: 550 },
  { id: 6, name: "Béjaïa", doorToDoorPrice: 800, officePickupPrice: 500 },
  { id: 7, name: "Biskra", doorToDoorPrice: 950, officePickupPrice: 650 },
  { id: 8, name: "Béchar", doorToDoorPrice: 1300, officePickupPrice: 900 },
  { id: 9, name: "Blida", doorToDoorPrice: 600, officePickupPrice: 400 },
  { id: 10, name: "Bouira", doorToDoorPrice: 750, officePickupPrice: 450 },
  { id: 16, name: "Alger", doorToDoorPrice: 500, officePickupPrice: 300 },
  { id: 31, name: "Oran", doorToDoorPrice: 700, officePickupPrice: 400 },
  { id: 19, name: "Sétif", doorToDoorPrice: 800, officePickupPrice: 500 },
  { id: 23, name: "Annaba", doorToDoorPrice: 750, officePickupPrice: 450 },
  { id: 25, name: "Constantine", doorToDoorPrice: 750, officePickupPrice: 450 },
  { id: 29, name: "Mascara", doorToDoorPrice: 850, officePickupPrice: 550 },
  { id: 15, name: "Tizi Ouzou", doorToDoorPrice: 800, officePickupPrice: 500 },
  { id: 22, name: "Sidi Bel Abbès", doorToDoorPrice: 850, officePickupPrice: 550 },
  { id: 27, name: "Mostaganem", doorToDoorPrice: 800, officePickupPrice: 500 },
  { id: 34, name: "Bordj Bou Arréridj", doorToDoorPrice: 850, officePickupPrice: 550 },
]

export const pickupOffices: PickupOffice[] = [
  {
    id: "office-1",
    officeName: "Decora Central Office",
    address: "15 Rue Didouche Mourad, Centre Ville",
    wilayaId: 16,
  },
  {
    id: "office-2",
    officeName: "Decora Hydra",
    address: "45 Boulevard des Martyrs, Hydra",
    wilayaId: 16,
  },
  {
    id: "office-3",
    officeName: "Decora Bab Ezzouar",
    address: "Centre Commercial Bab Ezzouar, Local 24",
    wilayaId: 16,
  },
  {
    id: "office-4",
    officeName: "Decora Oran Centre",
    address: "22 Boulevard de l'ALN, Centre Ville",
    wilayaId: 31,
  },
  {
    id: "office-5",
    officeName: "Decora USTO",
    address: "Cité USTO, Bloc 17, Local 3",
    wilayaId: 31,
  },
  {
    id: "office-6",
    officeName: "Decora Constantine",
    address: "17 Avenue Abane Ramdane",
    wilayaId: 25,
  },
  {
    id: "office-7",
    officeName: "Decora Annaba",
    address: "Cité du 8 Mai 1945, Bloc 12",
    wilayaId: 23,
  },
  {
    id: "office-8",
    officeName: "Decora Sétif",
    address: "Cité El Hidhab, Local 7",
    wilayaId: 19,
  },
  {
    id: "office-9",
    officeName: "Decora Béjaïa",
    address: "Boulevard de la Liberté, Immeuble El Karim",
    wilayaId: 6,
  },
  {
    id: "office-10",
    officeName: "Decora Tizi Ouzou",
    address: "Nouvelle Ville, Immeuble Amirouche",
    wilayaId: 15,
  },
  {
    id: "office-11",
    officeName: "Decora Blida",
    address: "Rue des Frères Ader, Centre Ville",
    wilayaId: 9,
  },
  {
    id: "office-12",
    officeName: "Decora Batna",
    address: "Zone d'Activité, Bloc 5",
    wilayaId: 5,
  },
]
