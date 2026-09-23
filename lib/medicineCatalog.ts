export interface MedicineItem {
  name: string;
  category: string;
  mrp: number;
  composition: string;
  popular?: boolean;
}

export const COMPREHENSIVE_MEDICINES: MedicineItem[] = [
  {
    "name": "Dolo 650mg Tablet",
    "category": "Fever & Pain",
    "mrp": 34,
    "composition": "Paracetamol 650mg",
    "popular": true
  },
  {
    "name": "Dolo 500mg Tablet",
    "category": "Fever & Pain",
    "mrp": 20,
    "composition": "Paracetamol 500mg",
    "popular": false
  },
  {
    "name": "Dolo 120mg Suspension",
    "category": "Fever & Pain",
    "mrp": 42,
    "composition": "Paracetamol 120mg/5ml",
    "popular": false
  },
  {
    "name": "Dolo 250mg Suspension",
    "category": "Fever & Pain",
    "mrp": 55,
    "composition": "Paracetamol 250mg/5ml",
    "popular": false
  },
  {
    "name": "Calpol 500mg Tablet",
    "category": "Fever & Pain",
    "mrp": 22,
    "composition": "Paracetamol 500mg",
    "popular": true
  },
  {
    "name": "Calpol 650mg Tablet",
    "category": "Fever & Pain",
    "mrp": 32,
    "composition": "Paracetamol 650mg",
    "popular": true
  },
  {
    "name": "Calpol 250mg Pead Suspension",
    "category": "Fever & Pain",
    "mrp": 48,
    "composition": "Paracetamol 250mg/5ml",
    "popular": false
  },
  {
    "name": "Calpol 120mg Pead Suspension",
    "category": "Fever & Pain",
    "mrp": 38,
    "composition": "Paracetamol 120mg/5ml",
    "popular": false
  },
  {
    "name": "Calpol T Tablet",
    "category": "Fever & Pain",
    "mrp": 110,
    "composition": "Paracetamol 325mg + Tramadol 37.5mg",
    "popular": false
  },
  {
    "name": "Crocin 500mg Tablet",
    "category": "Fever & Pain",
    "mrp": 20,
    "composition": "Paracetamol 500mg",
    "popular": false
  },
  {
    "name": "Crocin 650mg Advance",
    "category": "Fever & Pain",
    "mrp": 35,
    "composition": "Paracetamol 650mg Optizorb",
    "popular": false
  },
  {
    "name": "Crocin Advance Tablet",
    "category": "Fever & Pain",
    "mrp": 25,
    "composition": "Paracetamol 500mg Optizorb",
    "popular": true
  },
  {
    "name": "Crocin Pain Relief Tablet",
    "category": "Fever & Pain",
    "mrp": 68,
    "composition": "Paracetamol 650mg + Caffeine 50mg",
    "popular": false
  },
  {
    "name": "Crocin 120mg Syrup",
    "category": "Fever & Pain",
    "mrp": 40,
    "composition": "Paracetamol 120mg/5ml",
    "popular": false
  },
  {
    "name": "Crocin 240mg DS Syrup",
    "category": "Fever & Pain",
    "mrp": 58,
    "composition": "Paracetamol 240mg/5ml",
    "popular": false
  },
  {
    "name": "Pacimol 500mg Tablet",
    "category": "Fever & Pain",
    "mrp": 18,
    "composition": "Paracetamol 500mg",
    "popular": false
  },
  {
    "name": "Pacimol 650mg Tablet",
    "category": "Fever & Pain",
    "mrp": 30,
    "composition": "Paracetamol 650mg",
    "popular": false
  },
  {
    "name": "Sumo Tablet",
    "category": "Fever & Pain",
    "mrp": 115,
    "composition": "Nimesulide 100mg + Paracetamol 325mg",
    "popular": true
  },
  {
    "name": "Sumo Cold Tablet",
    "category": "Fever & Pain",
    "mrp": 55,
    "composition": "Paracetamol + Phenylephrine + Caffeine",
    "popular": false
  },
  {
    "name": "Sumo L 250mg Suspension",
    "category": "Fever & Pain",
    "mrp": 45,
    "composition": "Paracetamol 250mg/5ml",
    "popular": false
  },
  {
    "name": "Nise 100mg Tablet",
    "category": "Fever & Pain",
    "mrp": 85,
    "composition": "Nimesulide 100mg",
    "popular": false
  },
  {
    "name": "Nise Gel 30g",
    "category": "Fever & Pain",
    "mrp": 120,
    "composition": "Nimesulide 1% w/w",
    "popular": false
  },
  {
    "name": "Zerodol 100mg Tablet",
    "category": "Fever & Pain",
    "mrp": 55,
    "composition": "Aceclofenac 100mg",
    "popular": false
  },
  {
    "name": "Zerodol-P Tablet",
    "category": "Fever & Pain",
    "mrp": 68,
    "composition": "Aceclofenac 100mg + Paracetamol 325mg",
    "popular": true
  },
  {
    "name": "Zerodol-SP Tablet",
    "category": "Fever & Pain",
    "mrp": 124,
    "composition": "Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg",
    "popular": true
  },
  {
    "name": "Zerodol-TH 4 Tablet",
    "category": "Fever & Pain",
    "mrp": 195,
    "composition": "Aceclofenac 100mg + Thiocolchicoside 4mg",
    "popular": false
  },
  {
    "name": "Zerodol-TH 8 Tablet",
    "category": "Fever & Pain",
    "mrp": 285,
    "composition": "Aceclofenac 100mg + Thiocolchicoside 8mg",
    "popular": false
  },
  {
    "name": "Zerodol-CR 200mg Tablet",
    "category": "Fever & Pain",
    "mrp": 110,
    "composition": "Aceclofenac 200mg Controlled Release",
    "popular": false
  },
  {
    "name": "Hifenac 100mg Tablet",
    "category": "Fever & Pain",
    "mrp": 58,
    "composition": "Aceclofenac 100mg",
    "popular": false
  },
  {
    "name": "Hifenac-P Tablet",
    "category": "Fever & Pain",
    "mrp": 72,
    "composition": "Aceclofenac 100mg + Paracetamol 325mg",
    "popular": true
  },
  {
    "name": "Hifenac-SP Tablet",
    "category": "Fever & Pain",
    "mrp": 130,
    "composition": "Aceclofenac + Paracetamol + Serratiopeptidase",
    "popular": false
  },
  {
    "name": "Hifenac-TH 4 Tablet",
    "category": "Fever & Pain",
    "mrp": 205,
    "composition": "Aceclofenac 100mg + Thiocolchicoside 4mg",
    "popular": false
  },
  {
    "name": "Hifenac-D Tablet",
    "category": "Fever & Pain",
    "mrp": 85,
    "composition": "Aceclofenac 100mg + Drotaverine 80mg",
    "popular": false
  },
  {
    "name": "Combiflam Tablet",
    "category": "Fever & Pain",
    "mrp": 48,
    "composition": "Ibuprofen 400mg + Paracetamol 325mg",
    "popular": true
  },
  {
    "name": "Combiflam Plus Tablet",
    "category": "Fever & Pain",
    "mrp": 52,
    "composition": "Paracetamol 650mg + Caffeine 50mg",
    "popular": false
  },
  {
    "name": "Combiflam Icy Hot Gel",
    "category": "Fever & Pain",
    "mrp": 140,
    "composition": "Diclofenac + Virgin Linseed Oil + Menthol",
    "popular": false
  },
  {
    "name": "Brufen 200mg Tablet",
    "category": "Fever & Pain",
    "mrp": 12,
    "composition": "Ibuprofen 200mg",
    "popular": false
  },
  {
    "name": "Brufen 400mg Tablet",
    "category": "Fever & Pain",
    "mrp": 20,
    "composition": "Ibuprofen 400mg",
    "popular": true
  },
  {
    "name": "Brufen 600mg Tablet",
    "category": "Fever & Pain",
    "mrp": 35,
    "composition": "Ibuprofen 600mg",
    "popular": false
  },
  {
    "name": "Flexon Tablet",
    "category": "Fever & Pain",
    "mrp": 32,
    "composition": "Ibuprofen 400mg + Paracetamol 325mg",
    "popular": true
  },
  {
    "name": "Flexon MR Tablet",
    "category": "Fever & Pain",
    "mrp": 65,
    "composition": "Ibuprofen + Paracetamol + Chlorzoxazone",
    "popular": false
  },
  {
    "name": "Ibugesic Plus Tablet",
    "category": "Fever & Pain",
    "mrp": 30,
    "composition": "Ibuprofen 400mg + Paracetamol 325mg",
    "popular": false
  },
  {
    "name": "Ibugesic Plus Syrup",
    "category": "Fever & Pain",
    "mrp": 44,
    "composition": "Ibuprofen 100mg + Paracetamol 162.5mg/5ml",
    "popular": false
  },
  {
    "name": "Voveran 50 GE Tablet",
    "category": "Fever & Pain",
    "mrp": 65,
    "composition": "Diclofenac Sodium 50mg",
    "popular": true
  },
  {
    "name": "Voveran SR 75mg Tablet",
    "category": "Fever & Pain",
    "mrp": 125,
    "composition": "Diclofenac Sodium 75mg SR",
    "popular": false
  },
  {
    "name": "Voveran SR 100mg Tablet",
    "category": "Fever & Pain",
    "mrp": 180,
    "composition": "Diclofenac Sodium 100mg SR",
    "popular": false
  },
  {
    "name": "Voveran Emulgel 30g",
    "category": "Fever & Pain",
    "mrp": 165,
    "composition": "Diclofenac Diethylamine 1.16% w/w",
    "popular": false
  },
  {
    "name": "Voveran TPM Gel 30g",
    "category": "Fever & Pain",
    "mrp": 185,
    "composition": "Diclofenac 1% w/w + Menthol",
    "popular": false
  },
  {
    "name": "Dynapar AQ Injection 1ml",
    "category": "Fever & Pain",
    "mrp": 32,
    "composition": "Diclofenac Sodium 75mg/ml",
    "popular": false
  },
  {
    "name": "Dynapar Tablet",
    "category": "Fever & Pain",
    "mrp": 75,
    "composition": "Diclofenac Sodium 50mg + Paracetamol 325mg",
    "popular": false
  },
  {
    "name": "Dynapar QPS Solution 30ml",
    "category": "Fever & Pain",
    "mrp": 220,
    "composition": "Diclofenac Quick Penetrating Solution",
    "popular": false
  },
  {
    "name": "Ultracet Tablet",
    "category": "Fever & Pain",
    "mrp": 265,
    "composition": "Tramadol 37.5mg + Paracetamol 325mg",
    "popular": true
  },
  {
    "name": "Ultracet Semi Tablet",
    "category": "Fever & Pain",
    "mrp": 145,
    "composition": "Tramadol 18.75mg + Paracetamol 162.5mg",
    "popular": false
  },
  {
    "name": "Tramazac 50mg Capsule",
    "category": "Fever & Pain",
    "mrp": 75,
    "composition": "Tramadol Hydrochloride 50mg",
    "popular": false
  },
  {
    "name": "Ketorol-DT 10mg Tablet",
    "category": "Fever & Pain",
    "mrp": 142,
    "composition": "Ketorolac Tromethamine 10mg",
    "popular": true
  },
  {
    "name": "Ketanov 10mg Tablet",
    "category": "Fever & Pain",
    "mrp": 135,
    "composition": "Ketorolac Tromethamine 10mg",
    "popular": false
  },
  {
    "name": "Naprosyn 250mg Tablet",
    "category": "Fever & Pain",
    "mrp": 55,
    "composition": "Naproxen 250mg",
    "popular": false
  },
  {
    "name": "Naprosyn 500mg Tablet",
    "category": "Fever & Pain",
    "mrp": 95,
    "composition": "Naproxen 500mg",
    "popular": false
  },
  {
    "name": "Torcoxia 60mg Tablet",
    "category": "Fever & Pain",
    "mrp": 115,
    "composition": "Etoricoxib 60mg",
    "popular": false
  },
  {
    "name": "Torcoxia 90mg Tablet",
    "category": "Fever & Pain",
    "mrp": 165,
    "composition": "Etoricoxib 90mg",
    "popular": true
  },
  {
    "name": "Torcoxia 120mg Tablet",
    "category": "Fever & Pain",
    "mrp": 210,
    "composition": "Etoricoxib 120mg",
    "popular": false
  },
  {
    "name": "Nucoxia 60mg Tablet",
    "category": "Fever & Pain",
    "mrp": 120,
    "composition": "Etoricoxib 60mg",
    "popular": false
  },
  {
    "name": "Nucoxia 90mg Tablet",
    "category": "Fever & Pain",
    "mrp": 170,
    "composition": "Etoricoxib 90mg",
    "popular": false
  },
  {
    "name": "Nucoxia 120mg Tablet",
    "category": "Fever & Pain",
    "mrp": 215,
    "composition": "Etoricoxib 120mg",
    "popular": false
  },
  {
    "name": "Nucoxia-MR Tablet",
    "category": "Fever & Pain",
    "mrp": 260,
    "composition": "Etoricoxib 60mg + Thiocolchicoside 4mg",
    "popular": false
  },
  {
    "name": "Etoshine 90mg Tablet",
    "category": "Fever & Pain",
    "mrp": 155,
    "composition": "Etoricoxib 90mg",
    "popular": false
  },
  {
    "name": "Meftal 500mg Tablet",
    "category": "Fever & Pain",
    "mrp": 45,
    "composition": "Mefenamic Acid 500mg",
    "popular": false
  },
  {
    "name": "Meftal 250mg Tablet",
    "category": "Fever & Pain",
    "mrp": 28,
    "composition": "Mefenamic Acid 250mg",
    "popular": false
  },
  {
    "name": "Meftal-Spas Tablet",
    "category": "Fever & Pain",
    "mrp": 52,
    "composition": "Mefenamic Acid 250mg + Dicyclomine 10mg",
    "popular": true
  },
  {
    "name": "Meftal-Spas DS Tablet",
    "category": "Fever & Pain",
    "mrp": 68,
    "composition": "Mefenamic Acid 500mg + Dicyclomine 20mg",
    "popular": false
  },
  {
    "name": "Meftal-P Pead Suspension",
    "category": "Fever & Pain",
    "mrp": 42,
    "composition": "Mefenamic Acid 100mg/5ml",
    "popular": false
  },
  {
    "name": "Cyclopam Tablet",
    "category": "Fever & Pain",
    "mrp": 54,
    "composition": "Dicyclomine 20mg + Paracetamol 500mg",
    "popular": false
  },
  {
    "name": "Cyclopam Plus Tablet",
    "category": "Fever & Pain",
    "mrp": 65,
    "composition": "Dicyclomine 20mg + Paracetamol 325mg",
    "popular": false
  },
  {
    "name": "Baralgan-M Tablet",
    "category": "Fever & Pain",
    "mrp": 60,
    "composition": "Mefenamic Acid + Drotaverine",
    "popular": false
  },
  {
    "name": "Drotin 40mg Tablet",
    "category": "Fever & Pain",
    "mrp": 95,
    "composition": "Drotaverine Hydrochloride 40mg",
    "popular": false
  },
  {
    "name": "Drotin 80mg DS Tablet",
    "category": "Fever & Pain",
    "mrp": 160,
    "composition": "Drotaverine Hydrochloride 80mg",
    "popular": false
  },
  {
    "name": "Drotin-Plus Tablet",
    "category": "Fever & Pain",
    "mrp": 110,
    "composition": "Drotaverine 80mg + Paracetamol 500mg",
    "popular": false
  },
  {
    "name": "Drotikind 40mg Tablet",
    "category": "Fever & Pain",
    "mrp": 72,
    "composition": "Drotaverine 40mg",
    "popular": false
  },
  {
    "name": "Saridon Tablet",
    "category": "Fever & Pain",
    "mrp": 42,
    "composition": "Propyphenazone 150mg + Paracetamol 250mg + Caffeine 50mg",
    "popular": true
  },
  {
    "name": "Disprin Regular Tablet",
    "category": "Fever & Pain",
    "mrp": 12,
    "composition": "Soluble Aspirin 350mg",
    "popular": false
  },
  {
    "name": "Feldene 20mg Capsule",
    "category": "Fever & Pain",
    "mrp": 110,
    "composition": "Piroxicam 20mg",
    "popular": false
  },
  {
    "name": "Dolonex 20mg Tablet",
    "category": "Fever & Pain",
    "mrp": 125,
    "composition": "Piroxicam 20mg",
    "popular": false
  },
  {
    "name": "Dolonex DT 20mg Tablet",
    "category": "Fever & Pain",
    "mrp": 140,
    "composition": "Piroxicam 20mg Dispersible",
    "popular": false
  },
  {
    "name": "Myoril 4mg Capsule",
    "category": "Fever & Pain",
    "mrp": 190,
    "composition": "Thiocolchicoside 4mg",
    "popular": false
  },
  {
    "name": "Myoril 8mg Capsule",
    "category": "Fever & Pain",
    "mrp": 295,
    "composition": "Thiocolchicoside 8mg",
    "popular": false
  },
  {
    "name": "Muscoril 4mg Capsule",
    "category": "Fever & Pain",
    "mrp": 185,
    "composition": "Thiocolchicoside 4mg",
    "popular": false
  },
  {
    "name": "Liofen 10mg Tablet",
    "category": "Fever & Pain",
    "mrp": 140,
    "composition": "Baclofen 10mg",
    "popular": false
  },
  {
    "name": "Liofen 25mg Tablet",
    "category": "Fever & Pain",
    "mrp": 260,
    "composition": "Baclofen 25mg",
    "popular": false
  },
  {
    "name": "Volini Pain Relief Gel 30g",
    "category": "Fever & Pain",
    "mrp": 155,
    "composition": "Diclofenac + Linseed Oil + Methyl Salicylate",
    "popular": true
  },
  {
    "name": "Volini Spray 55g",
    "category": "Fever & Pain",
    "mrp": 210,
    "composition": "Diclofenac 1.16% Aerosol Spray",
    "popular": false
  },
  {
    "name": "Omnigel 30g Gel",
    "category": "Fever & Pain",
    "mrp": 140,
    "composition": "Diclofenac + Linseed Oil + Menthol",
    "popular": true
  },
  {
    "name": "Omnigel Spray 55g",
    "category": "Fever & Pain",
    "mrp": 195,
    "composition": "Diclofenac Pain Relief Spray",
    "popular": false
  },
  {
    "name": "Moov Pain Relief Cream 50g",
    "category": "Fever & Pain",
    "mrp": 180,
    "composition": "Ayurvedic Herbal Pain Cream",
    "popular": false
  },
  {
    "name": "Moov Spray 80g",
    "category": "Fever & Pain",
    "mrp": 220,
    "composition": "Fast Pain Relief Spray",
    "popular": false
  },
  {
    "name": "Relispray 55g",
    "category": "Fever & Pain",
    "mrp": 165,
    "composition": "Ayurvedic Pain Relief Spray",
    "popular": false
  },
  {
    "name": "Iodex Ultra Gel 30g",
    "category": "Fever & Pain",
    "mrp": 135,
    "composition": "Diclofenac Pain Relief Gel",
    "popular": false
  },
  {
    "name": "Amrutanjan Strong Balm 10g",
    "category": "Fever & Pain",
    "mrp": 45,
    "composition": "Camphor + Menthol Pain Balm",
    "popular": false
  },
  {
    "name": "Zandu Balm 25ml",
    "category": "Fever & Pain",
    "mrp": 85,
    "composition": "Ayurvedic Pain Relief Balm",
    "popular": false
  },
  {
    "name": "Tiger Balm Red 21ml",
    "category": "Fever & Pain",
    "mrp": 95,
    "composition": "Camphor + Clove + Cinnamon Balm",
    "popular": false
  },
  {
    "name": "Tiger Balm White 21ml",
    "category": "Fever & Pain",
    "mrp": 95,
    "composition": "Camphor + Menthol Cooling Balm",
    "popular": false
  },
  {
    "name": "Augmentin 625 Duo Tablet",
    "category": "Antibiotic",
    "mrp": 223,
    "composition": "Amoxycillin 500mg + Clavulanic Acid 125mg",
    "popular": true
  },
  {
    "name": "Augmentin 375 Tablet",
    "category": "Antibiotic",
    "mrp": 155,
    "composition": "Amoxycillin 250mg + Clavulanic Acid 125mg",
    "popular": false
  },
  {
    "name": "Augmentin 1000mg Duo",
    "category": "Antibiotic",
    "mrp": 380,
    "composition": "Amoxycillin 875mg + Clavulanic Acid 125mg",
    "popular": false
  },
  {
    "name": "Augmentin Duo Oral Susp 30ml",
    "category": "Antibiotic",
    "mrp": 98,
    "composition": "Amoxycillin 200mg + Clavulanic Acid 28.5mg",
    "popular": false
  },
  {
    "name": "Augmentin DDS Oral Susp 30ml",
    "category": "Antibiotic",
    "mrp": 145,
    "composition": "Amoxycillin 400mg + Clavulanic Acid 57mg",
    "popular": false
  },
  {
    "name": "Clavam 625 Tablet",
    "category": "Antibiotic",
    "mrp": 220,
    "composition": "Amoxycillin 500mg + Clavulanate 125mg",
    "popular": true
  },
  {
    "name": "Clavam 375 Tablet",
    "category": "Antibiotic",
    "mrp": 150,
    "composition": "Amoxycillin 250mg + Clavulanate 125mg",
    "popular": false
  },
  {
    "name": "Clavam Forte Dry Syrup",
    "category": "Antibiotic",
    "mrp": 138,
    "composition": "Amoxicillin + Clavulanic Acid Dry Syrup",
    "popular": false
  },
  {
    "name": "Clavam BID Syrup",
    "category": "Antibiotic",
    "mrp": 95,
    "composition": "Amoxicillin 200mg + Clavulanate 28.5mg",
    "popular": false
  },
  {
    "name": "Moxikind-CV 625 Tablet",
    "category": "Antibiotic",
    "mrp": 185,
    "composition": "Amoxicillin 500mg + Potassium Clavulanate 125mg",
    "popular": true
  },
  {
    "name": "Moxikind-CV 375 Tablet",
    "category": "Antibiotic",
    "mrp": 130,
    "composition": "Amoxicillin 250mg + Clavulanate 125mg",
    "popular": false
  },
  {
    "name": "Amoxyclav 625 Tablet",
    "category": "Antibiotic",
    "mrp": 210,
    "composition": "Amoxycillin 500mg + Clavulanic Acid 125mg",
    "popular": false
  },
  {
    "name": "Novamox 500 Capsule",
    "category": "Antibiotic",
    "mrp": 90,
    "composition": "Amoxicillin 500mg",
    "popular": false
  },
  {
    "name": "Novamox 250 Capsule",
    "category": "Antibiotic",
    "mrp": 48,
    "composition": "Amoxicillin 250mg",
    "popular": false
  },
  {
    "name": "Novamox 125 Dry Syrup",
    "category": "Antibiotic",
    "mrp": 42,
    "composition": "Amoxicillin 125mg/5ml",
    "popular": false
  },
  {
    "name": "Mox 500mg Capsule",
    "category": "Antibiotic",
    "mrp": 88,
    "composition": "Amoxicillin 500mg",
    "popular": false
  },
  {
    "name": "Mox 250mg Capsule",
    "category": "Antibiotic",
    "mrp": 45,
    "composition": "Amoxicillin 250mg",
    "popular": false
  },
  {
    "name": "Azithral 500mg Tablet",
    "category": "Antibiotic",
    "mrp": 138,
    "composition": "Azithromycin 500mg",
    "popular": true
  },
  {
    "name": "Azithral 250mg Tablet",
    "category": "Antibiotic",
    "mrp": 75,
    "composition": "Azithromycin 250mg",
    "popular": false
  },
  {
    "name": "Azithral 100 Pead Suspension",
    "category": "Antibiotic",
    "mrp": 62,
    "composition": "Azithromycin 100mg/5ml",
    "popular": false
  },
  {
    "name": "Azithral 200 Liquid 15ml",
    "category": "Antibiotic",
    "mrp": 92,
    "composition": "Azithromycin 200mg/5ml",
    "popular": false
  },
  {
    "name": "Azithromycin 500mg Tablet",
    "category": "Antibiotic",
    "mrp": 145,
    "composition": "Azithromycin IP 500mg",
    "popular": true
  },
  {
    "name": "Azithromycin 250mg Tablet",
    "category": "Antibiotic",
    "mrp": 80,
    "composition": "Azithromycin IP 250mg",
    "popular": false
  },
  {
    "name": "Azee 500 Tablet",
    "category": "Antibiotic",
    "mrp": 135,
    "composition": "Azithromycin 500mg",
    "popular": true
  },
  {
    "name": "Azee 250 Tablet",
    "category": "Antibiotic",
    "mrp": 72,
    "composition": "Azithromycin 250mg",
    "popular": false
  },
  {
    "name": "Azee 1000 Tablet",
    "category": "Antibiotic",
    "mrp": 125,
    "composition": "Azithromycin 1000mg Single Dose",
    "popular": false
  },
  {
    "name": "Azee 200 Rediuse Syrup",
    "category": "Antibiotic",
    "mrp": 90,
    "composition": "Azithromycin 200mg/5ml",
    "popular": false
  },
  {
    "name": "Taxim-O 200 Tablet",
    "category": "Antibiotic",
    "mrp": 120,
    "composition": "Cefixime 200mg",
    "popular": true
  },
  {
    "name": "Taxim-O 100 Tablet",
    "category": "Antibiotic",
    "mrp": 68,
    "composition": "Cefixime 100mg",
    "popular": false
  },
  {
    "name": "Taxim-O 50 Dry Syrup",
    "category": "Antibiotic",
    "mrp": 55,
    "composition": "Cefixime 50mg/5ml",
    "popular": false
  },
  {
    "name": "Taxim-O CV 200 Tablet",
    "category": "Antibiotic",
    "mrp": 245,
    "composition": "Cefixime 200mg + Clavulanic Acid 125mg",
    "popular": false
  },
  {
    "name": "Taxim 1g Injection",
    "category": "Antibiotic",
    "mrp": 45,
    "composition": "Cefotaxime Sodium 1g",
    "popular": false
  },
  {
    "name": "Mahacef 200 Tablet",
    "category": "Antibiotic",
    "mrp": 115,
    "composition": "Cefixime 200mg",
    "popular": true
  },
  {
    "name": "Mahacef 100 Tablet",
    "category": "Antibiotic",
    "mrp": 65,
    "composition": "Cefixime 100mg",
    "popular": false
  },
  {
    "name": "Mahacef-Plus Tablet",
    "category": "Antibiotic",
    "mrp": 185,
    "composition": "Cefixime 200mg + Ofloxacin 200mg",
    "popular": false
  },
  {
    "name": "Mahacef-CV 200 Tablet",
    "category": "Antibiotic",
    "mrp": 240,
    "composition": "Cefixime 200mg + Clavulanic Acid 125mg",
    "popular": false
  },
  {
    "name": "Zifi 200 Tablet",
    "category": "Antibiotic",
    "mrp": 118,
    "composition": "Cefixime 200mg",
    "popular": true
  },
  {
    "name": "Zifi 100 Tablet",
    "category": "Antibiotic",
    "mrp": 64,
    "composition": "Cefixime 100mg",
    "popular": false
  },
  {
    "name": "Zifi-CV 200 Tablet",
    "category": "Antibiotic",
    "mrp": 235,
    "composition": "Cefixime 200mg + Clavulanic Acid 125mg",
    "popular": false
  },
  {
    "name": "Zifi-O 200 Tablet",
    "category": "Antibiotic",
    "mrp": 180,
    "composition": "Cefixime 200mg + Ofloxacin 200mg",
    "popular": false
  },
  {
    "name": "Cepodem 200 Tablet",
    "category": "Antibiotic",
    "mrp": 195,
    "composition": "Cefpodoxime Proxetil 200mg",
    "popular": true
  },
  {
    "name": "Cepodem 100 Tablet",
    "category": "Antibiotic",
    "mrp": 105,
    "composition": "Cefpodoxime Proxetil 100mg",
    "popular": false
  },
  {
    "name": "Cepodem 50 Dry Syrup",
    "category": "Antibiotic",
    "mrp": 90,
    "composition": "Cefpodoxime Proxetil 50mg/5ml",
    "popular": false
  },
  {
    "name": "Cepodem-XP 325 Tablet",
    "category": "Antibiotic",
    "mrp": 340,
    "composition": "Cefpodoxime 200mg + Clavulanic Acid 125mg",
    "popular": false
  },
  {
    "name": "Monocef-O 200 Tablet",
    "category": "Antibiotic",
    "mrp": 188,
    "composition": "Cefpodoxime Proxetil 200mg",
    "popular": false
  },
  {
    "name": "Monocef-O 100 Tablet",
    "category": "Antibiotic",
    "mrp": 102,
    "composition": "Cefpodoxime Proxetil 100mg",
    "popular": false
  },
  {
    "name": "Monocef-O CV 200 Tablet",
    "category": "Antibiotic",
    "mrp": 330,
    "composition": "Cefpodoxime 200mg + Clavulanate 125mg",
    "popular": false
  },
  {
    "name": "Monocef 1g Injection",
    "category": "Antibiotic",
    "mrp": 68,
    "composition": "Ceftriaxone 1000mg",
    "popular": true
  },
  {
    "name": "Monocef 500mg Injection",
    "category": "Antibiotic",
    "mrp": 45,
    "composition": "Ceftriaxone 500mg",
    "popular": false
  },
  {
    "name": "Monocef-SB 1g Injection",
    "category": "Antibiotic",
    "mrp": 120,
    "composition": "Ceftriaxone 1000mg + Sulbactam 500mg",
    "popular": false
  },
  {
    "name": "Gudcef 200 Tablet",
    "category": "Antibiotic",
    "mrp": 182,
    "composition": "Cefpodoxime Proxetil 200mg",
    "popular": false
  },
  {
    "name": "Gudcef 100 Tablet",
    "category": "Antibiotic",
    "mrp": 98,
    "composition": "Cefpodoxime Proxetil 100mg",
    "popular": false
  },
  {
    "name": "Gudcef-CV 200 Tablet",
    "category": "Antibiotic",
    "mrp": 325,
    "composition": "Cefpodoxime 200mg + Clavulanic Acid 125mg",
    "popular": false
  },
  {
    "name": "Macpod 200 Tablet",
    "category": "Antibiotic",
    "mrp": 180,
    "composition": "Cefpodoxime Proxetil 200mg",
    "popular": false
  },
  {
    "name": "Macpod-CV 200 Tablet",
    "category": "Antibiotic",
    "mrp": 320,
    "composition": "Cefpodoxime + Clavulanic Acid",
    "popular": false
  },
  {
    "name": "Ceftum 500mg Tablet",
    "category": "Antibiotic",
    "mrp": 540,
    "composition": "Cefuroxime Axetil 500mg",
    "popular": true
  },
  {
    "name": "Ceftum 250mg Tablet",
    "category": "Antibiotic",
    "mrp": 290,
    "composition": "Cefuroxime Axetil 250mg",
    "popular": false
  },
  {
    "name": "Zinacef 750mg Injection",
    "category": "Antibiotic",
    "mrp": 160,
    "composition": "Cefuroxime Sodium 750mg",
    "popular": false
  },
  {
    "name": "Cetil 500mg Tablet",
    "category": "Antibiotic",
    "mrp": 510,
    "composition": "Cefuroxime Axetil 500mg",
    "popular": false
  },
  {
    "name": "Cetil 250mg Tablet",
    "category": "Antibiotic",
    "mrp": 275,
    "composition": "Cefuroxime Axetil 250mg",
    "popular": false
  },
  {
    "name": "Cifran 500 Tablet",
    "category": "Antibiotic",
    "mrp": 52,
    "composition": "Ciprofloxacin 500mg",
    "popular": true
  },
  {
    "name": "Cifran 250 Tablet",
    "category": "Antibiotic",
    "mrp": 30,
    "composition": "Ciprofloxacin 250mg",
    "popular": false
  },
  {
    "name": "Cifran-CT Tablet",
    "category": "Antibiotic",
    "mrp": 95,
    "composition": "Ciprofloxacin 500mg + Tinidazole 600mg",
    "popular": false
  },
  {
    "name": "Ciplox 500 Tablet",
    "category": "Antibiotic",
    "mrp": 48,
    "composition": "Ciprofloxacin 500mg",
    "popular": false
  },
  {
    "name": "Ciplox 250 Tablet",
    "category": "Antibiotic",
    "mrp": 28,
    "composition": "Ciprofloxacin 250mg",
    "popular": false
  },
  {
    "name": "Ciplox-TZ Tablet",
    "category": "Antibiotic",
    "mrp": 92,
    "composition": "Ciprofloxacin 500mg + Tinidazole 600mg",
    "popular": false
  },
  {
    "name": "Oflox 200 Tablet",
    "category": "Antibiotic",
    "mrp": 72,
    "composition": "Ofloxacin 200mg",
    "popular": true
  },
  {
    "name": "Oflox 400 Tablet",
    "category": "Antibiotic",
    "mrp": 135,
    "composition": "Ofloxacin 400mg",
    "popular": false
  },
  {
    "name": "Oflox-OZ Tablet",
    "category": "Antibiotic",
    "mrp": 160,
    "composition": "Ofloxacin 200mg + Ornidazole 500mg",
    "popular": false
  },
  {
    "name": "O2 Tablet",
    "category": "Antibiotic",
    "mrp": 165,
    "composition": "Ofloxacin 200mg + Ornidazole 500mg",
    "popular": true
  },
  {
    "name": "O2 Suspension 30ml",
    "category": "Antibiotic",
    "mrp": 68,
    "composition": "Ofloxacin 50mg + Ornidazole 125mg/5ml",
    "popular": false
  },
  {
    "name": "Zenflox 200 Tablet",
    "category": "Antibiotic",
    "mrp": 70,
    "composition": "Ofloxacin 200mg",
    "popular": false
  },
  {
    "name": "Zenflox-OZ Tablet",
    "category": "Antibiotic",
    "mrp": 155,
    "composition": "Ofloxacin 200mg + Ornidazole 500mg",
    "popular": false
  },
  {
    "name": "Norflox-TZ Tablet",
    "category": "Antibiotic",
    "mrp": 112,
    "composition": "Norfloxacin 400mg + Tinidazole 600mg",
    "popular": true
  },
  {
    "name": "Norflox 400 Tablet",
    "category": "Antibiotic",
    "mrp": 65,
    "composition": "Norfloxacin 400mg",
    "popular": false
  },
  {
    "name": "Levomac 500 Tablet",
    "category": "Antibiotic",
    "mrp": 105,
    "composition": "Levofloxacin 500mg",
    "popular": false
  },
  {
    "name": "Levomac 250 Tablet",
    "category": "Antibiotic",
    "mrp": 58,
    "composition": "Levofloxacin 250mg",
    "popular": false
  },
  {
    "name": "Levomac 750 Tablet",
    "category": "Antibiotic",
    "mrp": 145,
    "composition": "Levofloxacin 750mg",
    "popular": false
  },
  {
    "name": "Loxof 500 Tablet",
    "category": "Antibiotic",
    "mrp": 110,
    "composition": "Levofloxacin 500mg",
    "popular": false
  },
  {
    "name": "Metrogyl 400 Tablet",
    "category": "Antibiotic",
    "mrp": 24,
    "composition": "Metronidazole 400mg",
    "popular": true
  },
  {
    "name": "Metrogyl 200 Tablet",
    "category": "Antibiotic",
    "mrp": 14,
    "composition": "Metronidazole 200mg",
    "popular": false
  },
  {
    "name": "Metrogyl IV Infusion 100ml",
    "category": "Antibiotic",
    "mrp": 22,
    "composition": "Metronidazole 500mg/100ml",
    "popular": false
  },
  {
    "name": "Metrogyl-ER 600 Tablet",
    "category": "Antibiotic",
    "mrp": 45,
    "composition": "Metronidazole Extended Release 600mg",
    "popular": false
  },
  {
    "name": "Flagyl 400mg Tablet",
    "category": "Antibiotic",
    "mrp": 22,
    "composition": "Metronidazole 400mg",
    "popular": false
  },
  {
    "name": "Doxy-1 L-DR Forte",
    "category": "Antibiotic",
    "mrp": 125,
    "composition": "Doxycycline 100mg + Lactic Acid Bacillus",
    "popular": true
  },
  {
    "name": "Doxt-SL Capsule",
    "category": "Antibiotic",
    "mrp": 118,
    "composition": "Doxycycline 100mg + Lactobacillus",
    "popular": false
  },
  {
    "name": "Minochek 50mg Tablet",
    "category": "Antibiotic",
    "mrp": 195,
    "composition": "Minocycline 50mg",
    "popular": false
  },
  {
    "name": "Minochek 100mg Tablet",
    "category": "Antibiotic",
    "mrp": 340,
    "composition": "Minocycline 100mg",
    "popular": false
  },
  {
    "name": "Dalacin C 300mg Capsule",
    "category": "Antibiotic",
    "mrp": 310,
    "composition": "Clindamycin 300mg",
    "popular": false
  },
  {
    "name": "Clindac-A Gel 20g",
    "category": "Antibiotic",
    "mrp": 185,
    "composition": "Clindamycin Phosphate 1% w/w",
    "popular": false
  },
  {
    "name": "Linid 600mg Tablet",
    "category": "Antibiotic",
    "mrp": 480,
    "composition": "Linezolid 600mg",
    "popular": false
  },
  {
    "name": "Lizomac 600 Tablet",
    "category": "Antibiotic",
    "mrp": 460,
    "composition": "Linezolid 600mg",
    "popular": false
  },
  {
    "name": "Farobact 200 Tablet",
    "category": "Antibiotic",
    "mrp": 620,
    "composition": "Faropenem Sodium 200mg",
    "popular": false
  },
  {
    "name": "Farobact 300 ER Tablet",
    "category": "Antibiotic",
    "mrp": 890,
    "composition": "Faropenem Sodium 300mg ER",
    "popular": false
  },
  {
    "name": "Rifaximin 400mg Tablet",
    "category": "Antibiotic",
    "mrp": 390,
    "composition": "Rifaximin 400mg",
    "popular": false
  },
  {
    "name": "Rifagut 400mg Tablet",
    "category": "Antibiotic",
    "mrp": 410,
    "composition": "Rifaximin 400mg",
    "popular": true
  },
  {
    "name": "Rifagut 550mg Tablet",
    "category": "Antibiotic",
    "mrp": 540,
    "composition": "Rifaximin 550mg",
    "popular": false
  },
  {
    "name": "Fluconazole 150mg Tablet",
    "category": "Antibiotic",
    "mrp": 38,
    "composition": "Fluconazole 150mg",
    "popular": true
  },
  {
    "name": "Forcan 150 Tablet",
    "category": "Antibiotic",
    "mrp": 42,
    "composition": "Fluconazole 150mg",
    "popular": false
  },
  {
    "name": "Forcan 200 Tablet",
    "category": "Antibiotic",
    "mrp": 55,
    "composition": "Fluconazole 200mg",
    "popular": false
  },
  {
    "name": "Zocon 150 Tablet",
    "category": "Antibiotic",
    "mrp": 40,
    "composition": "Fluconazole 150mg",
    "popular": false
  },
  {
    "name": "Itremac 200 Capsule",
    "category": "Antibiotic",
    "mrp": 280,
    "composition": "Itraconazole 200mg",
    "popular": true
  },
  {
    "name": "Itremac 100 Capsule",
    "category": "Antibiotic",
    "mrp": 155,
    "composition": "Itraconazole 100mg",
    "popular": false
  },
  {
    "name": "Candiforce 200 Capsule",
    "category": "Antibiotic",
    "mrp": 265,
    "composition": "Itraconazole 200mg",
    "popular": true
  },
  {
    "name": "Candiforce 100 Capsule",
    "category": "Antibiotic",
    "mrp": 145,
    "composition": "Itraconazole 100mg",
    "popular": false
  },
  {
    "name": "Canditral 200 Capsule",
    "category": "Antibiotic",
    "mrp": 275,
    "composition": "Itraconazole 200mg",
    "popular": false
  },
  {
    "name": "Terbinafine 250mg Tablet",
    "category": "Antibiotic",
    "mrp": 165,
    "composition": "Terbinafine 250mg",
    "popular": false
  },
  {
    "name": "Sebifin 250 Tablet",
    "category": "Antibiotic",
    "mrp": 195,
    "composition": "Terbinafine 250mg",
    "popular": false
  },
  {
    "name": "Terbicip 250 Tablet",
    "category": "Antibiotic",
    "mrp": 180,
    "composition": "Terbinafine 250mg",
    "popular": false
  },
  {
    "name": "Terbicip 1% Cream 15g",
    "category": "Antibiotic",
    "mrp": 95,
    "composition": "Terbinafine Hydrochloride 1%",
    "popular": false
  },
  {
    "name": "Gris-OD 375 Tablet",
    "category": "Antibiotic",
    "mrp": 135,
    "composition": "Griseofulvin 375mg",
    "popular": false
  },
  {
    "name": "Vfend 200mg Tablet",
    "category": "Antibiotic",
    "mrp": 1850,
    "composition": "Voriconazole 200mg",
    "popular": false
  },
  {
    "name": "Acivir 400 Tablet",
    "category": "Antibiotic",
    "mrp": 120,
    "composition": "Acyclovir 400mg",
    "popular": false
  },
  {
    "name": "Acivir 800 Tablet",
    "category": "Antibiotic",
    "mrp": 230,
    "composition": "Acyclovir 800mg",
    "popular": false
  },
  {
    "name": "Acivir Eye Ointment 5g",
    "category": "Antibiotic",
    "mrp": 75,
    "composition": "Acyclovir 3% w/w",
    "popular": false
  },
  {
    "name": "Valcivir 1000 Tablet",
    "category": "Antibiotic",
    "mrp": 450,
    "composition": "Valacyclovir 1000mg",
    "popular": false
  },
  {
    "name": "Fluvir 75mg Capsule",
    "category": "Antibiotic",
    "mrp": 480,
    "composition": "Oseltamivir Phosphate 75mg",
    "popular": false
  },
  {
    "name": "Pan 40 Tablet",
    "category": "Antacid",
    "mrp": 155,
    "composition": "Pantoprazole 40mg",
    "popular": true
  },
  {
    "name": "Pan 20 Tablet",
    "category": "Antacid",
    "mrp": 85,
    "composition": "Pantoprazole 20mg",
    "popular": false
  },
  {
    "name": "Pan-D Capsule",
    "category": "Antacid",
    "mrp": 199,
    "composition": "Pantoprazole 40mg + Domperidone 30mg SR",
    "popular": true
  },
  {
    "name": "Pan-L Capsule",
    "category": "Antacid",
    "mrp": 235,
    "composition": "Pantoprazole 40mg + Levosulpiride 75mg SR",
    "popular": false
  },
  {
    "name": "Pan-MPS Syrup 200ml",
    "category": "Antacid",
    "mrp": 135,
    "composition": "Magaldrate + Simethicone Oral Suspension",
    "popular": false
  },
  {
    "name": "Pan-IV Injection",
    "category": "Antacid",
    "mrp": 52,
    "composition": "Pantoprazole Sodium 40mg",
    "popular": false
  },
  {
    "name": "Pantocid 40 Tablet",
    "category": "Antacid",
    "mrp": 160,
    "composition": "Pantoprazole 40mg",
    "popular": true
  },
  {
    "name": "Pantocid 20 Tablet",
    "category": "Antacid",
    "mrp": 90,
    "composition": "Pantoprazole 20mg",
    "popular": false
  },
  {
    "name": "Pantocid-DSR Capsule",
    "category": "Antacid",
    "mrp": 245,
    "composition": "Pantoprazole 40mg + Domperidone 30mg SR",
    "popular": true
  },
  {
    "name": "Pantocid-L Capsule",
    "category": "Antacid",
    "mrp": 240,
    "composition": "Pantoprazole + Levosulpiride SR",
    "popular": false
  },
  {
    "name": "Pantodac 40 Tablet",
    "category": "Antacid",
    "mrp": 150,
    "composition": "Pantoprazole 40mg",
    "popular": false
  },
  {
    "name": "Pantodac-DSR Capsule",
    "category": "Antacid",
    "mrp": 215,
    "composition": "Pantoprazole + Domperidone SR",
    "popular": false
  },
  {
    "name": "Omez 20 Capsule",
    "category": "Antacid",
    "mrp": 62,
    "composition": "Omeprazole 20mg",
    "popular": true
  },
  {
    "name": "Omez 10 Capsule",
    "category": "Antacid",
    "mrp": 35,
    "composition": "Omeprazole 10mg",
    "popular": false
  },
  {
    "name": "Omez 40 Capsule",
    "category": "Antacid",
    "mrp": 115,
    "composition": "Omeprazole 40mg",
    "popular": false
  },
  {
    "name": "Omez-D Capsule",
    "category": "Antacid",
    "mrp": 175,
    "composition": "Omeprazole 20mg + Domperidone 10mg",
    "popular": true
  },
  {
    "name": "Omez-Insta Sachet",
    "category": "Antacid",
    "mrp": 25,
    "composition": "Omeprazole 20mg + Sodium Bicarbonate",
    "popular": false
  },
  {
    "name": "Rabekind 20 Tablet",
    "category": "Antacid",
    "mrp": 88,
    "composition": "Rabeprazole Sodium 20mg",
    "popular": false
  },
  {
    "name": "Rabekind-DSR Capsule",
    "category": "Antacid",
    "mrp": 210,
    "composition": "Rabeprazole 20mg + Domperidone 30mg SR",
    "popular": true
  },
  {
    "name": "Rabekind-Plus Capsule",
    "category": "Antacid",
    "mrp": 230,
    "composition": "Rabeprazole + Levosulpiride",
    "popular": false
  },
  {
    "name": "Razo 20 Tablet",
    "category": "Antacid",
    "mrp": 140,
    "composition": "Rabeprazole Sodium 20mg",
    "popular": false
  },
  {
    "name": "Razo-D Capsule",
    "category": "Antacid",
    "mrp": 225,
    "composition": "Rabeprazole 20mg + Domperidone 30mg SR",
    "popular": true
  },
  {
    "name": "Razo-L Capsule",
    "category": "Antacid",
    "mrp": 260,
    "composition": "Rabeprazole 20mg + Levosulpiride 75mg SR",
    "popular": false
  },
  {
    "name": "Rablet 20 Tablet",
    "category": "Antacid",
    "mrp": 110,
    "composition": "Rabeprazole Sodium 20mg",
    "popular": false
  },
  {
    "name": "Rablet-D Capsule",
    "category": "Antacid",
    "mrp": 205,
    "composition": "Rabeprazole + Domperidone SR",
    "popular": false
  },
  {
    "name": "Nexpro 40 Tablet",
    "category": "Antacid",
    "mrp": 160,
    "composition": "Esomeprazole 40mg",
    "popular": false
  },
  {
    "name": "Nexpro 20 Tablet",
    "category": "Antacid",
    "mrp": 95,
    "composition": "Esomeprazole 20mg",
    "popular": false
  },
  {
    "name": "Nexpro-RD 40 Capsule",
    "category": "Antacid",
    "mrp": 230,
    "composition": "Esomeprazole 40mg + Domperidone 30mg SR",
    "popular": false
  },
  {
    "name": "Nexpro-RD 20 Capsule",
    "category": "Antacid",
    "mrp": 165,
    "composition": "Esomeprazole 20mg + Domperidone 30mg SR",
    "popular": false
  },
  {
    "name": "Nexpro-L Capsule",
    "category": "Antacid",
    "mrp": 255,
    "composition": "Esomeprazole + Levosulpiride SR",
    "popular": false
  },
  {
    "name": "Esomac 40 Tablet",
    "category": "Antacid",
    "mrp": 150,
    "composition": "Esomeprazole 40mg",
    "popular": false
  },
  {
    "name": "Esomac-D 40 Capsule",
    "category": "Antacid",
    "mrp": 220,
    "composition": "Esomeprazole + Domperidone",
    "popular": false
  },
  {
    "name": "Aciloc 150 Tablet",
    "category": "Antacid",
    "mrp": 44,
    "composition": "Ranitidine Hydrochloride 150mg",
    "popular": true
  },
  {
    "name": "Aciloc 300 Tablet",
    "category": "Antacid",
    "mrp": 58,
    "composition": "Ranitidine Hydrochloride 300mg",
    "popular": true
  },
  {
    "name": "Aciloc-RD Tablet",
    "category": "Antacid",
    "mrp": 75,
    "composition": "Ranitidine 150mg + Domperidone 10mg",
    "popular": false
  },
  {
    "name": "Rantac 150 Tablet",
    "category": "Antacid",
    "mrp": 42,
    "composition": "Ranitidine Hydrochloride 150mg",
    "popular": false
  },
  {
    "name": "Rantac 300 Tablet",
    "category": "Antacid",
    "mrp": 56,
    "composition": "Ranitidine Hydrochloride 300mg",
    "popular": false
  },
  {
    "name": "Rantac Injection 2ml",
    "category": "Antacid",
    "mrp": 12,
    "composition": "Ranitidine Hydrochloride 25mg/ml",
    "popular": false
  },
  {
    "name": "Zinetac 150 Tablet",
    "category": "Antacid",
    "mrp": 38,
    "composition": "Ranitidine 150mg",
    "popular": false
  },
  {
    "name": "Gelusil Antacid Syrup 200ml",
    "category": "Antacid",
    "mrp": 130,
    "composition": "Aluminium Hydroxide + Magnesium + Simethicone",
    "popular": true
  },
  {
    "name": "Gelusil Antacid Tablet",
    "category": "Antacid",
    "mrp": 20,
    "composition": "Aluminium + Magnesium + Dimethicone Chewable",
    "popular": false
  },
  {
    "name": "Digene Gel Mint 200ml",
    "category": "Antacid",
    "mrp": 140,
    "composition": "Magnesium Hydroxide + Simethicone",
    "popular": true
  },
  {
    "name": "Digene Gel Orange 200ml",
    "category": "Antacid",
    "mrp": 140,
    "composition": "Magnesium Hydroxide + Simethicone",
    "popular": false
  },
  {
    "name": "Digene Chewable Tablet",
    "category": "Antacid",
    "mrp": 22,
    "composition": "Antacid Chewable Tablet",
    "popular": false
  },
  {
    "name": "Mucaine Gel 200ml",
    "category": "Antacid",
    "mrp": 195,
    "composition": "Oxetacaine + Aluminium Hydroxide + Magnesium",
    "popular": true
  },
  {
    "name": "Eno Regular Sachet 5g",
    "category": "Antacid",
    "mrp": 10,
    "composition": "Sodium Bicarbonate + Citric Acid",
    "popular": true
  },
  {
    "name": "Eno Lemon Sachet 5g",
    "category": "Antacid",
    "mrp": 10,
    "composition": "Sodium Bicarbonate + Citric Acid (Lemon)",
    "popular": false
  },
  {
    "name": "Eno Orange Sachet 5g",
    "category": "Antacid",
    "mrp": 10,
    "composition": "Sodium Bicarbonate + Citric Acid (Orange)",
    "popular": false
  },
  {
    "name": "Electral ORS Powder 21.8g",
    "category": "Antacid",
    "mrp": 22,
    "composition": "Oral Rehydration Salts WHO Formula",
    "popular": true
  },
  {
    "name": "Enerzal Powder 100g",
    "category": "Antacid",
    "mrp": 55,
    "composition": "Energy & Electrolyte Drink Powder",
    "popular": false
  },
  {
    "name": "Ondem 4 Tablet",
    "category": "Antacid",
    "mrp": 58,
    "composition": "Ondansetron 4mg",
    "popular": true
  },
  {
    "name": "Ondem 8 Tablet",
    "category": "Antacid",
    "mrp": 98,
    "composition": "Ondansetron 8mg",
    "popular": false
  },
  {
    "name": "Ondem Syrup 30ml",
    "category": "Antacid",
    "mrp": 40,
    "composition": "Ondansetron 2mg/5ml",
    "popular": false
  },
  {
    "name": "Ondem MD 4 Tablet",
    "category": "Antacid",
    "mrp": 62,
    "composition": "Ondansetron 4mg Mouth Dissolving",
    "popular": false
  },
  {
    "name": "Vomikind 4 Tablet",
    "category": "Antacid",
    "mrp": 52,
    "composition": "Ondansetron 4mg",
    "popular": false
  },
  {
    "name": "Vomikind MD 4 Tablet",
    "category": "Antacid",
    "mrp": 56,
    "composition": "Ondansetron 4mg Mouth Dissolving",
    "popular": false
  },
  {
    "name": "Emeset 4 Tablet",
    "category": "Antacid",
    "mrp": 55,
    "composition": "Ondansetron 4mg",
    "popular": false
  },
  {
    "name": "Emeset 8 Tablet",
    "category": "Antacid",
    "mrp": 92,
    "composition": "Ondansetron 8mg",
    "popular": false
  },
  {
    "name": "Perinorm 10mg Tablet",
    "category": "Antacid",
    "mrp": 18,
    "composition": "Metoclopramide 10mg",
    "popular": false
  },
  {
    "name": "Perinorm Injection 2ml",
    "category": "Antacid",
    "mrp": 10,
    "composition": "Metoclopramide 5mg/ml",
    "popular": false
  },
  {
    "name": "Domstal 10mg Tablet",
    "category": "Antacid",
    "mrp": 35,
    "composition": "Domperidone 10mg",
    "popular": false
  },
  {
    "name": "Domstal Baby Drops 5ml",
    "category": "Antacid",
    "mrp": 30,
    "composition": "Domperidone 10mg/ml",
    "popular": false
  },
  {
    "name": "Ganaton 50mg Tablet",
    "category": "Antacid",
    "mrp": 145,
    "composition": "Itopride Hydrochloride 50mg",
    "popular": false
  },
  {
    "name": "Sucrafil Suspension 200ml",
    "category": "Antacid",
    "mrp": 215,
    "composition": "Sucralfate 1000mg/10ml",
    "popular": false
  },
  {
    "name": "Sucrafil-O Gel 200ml",
    "category": "Antacid",
    "mrp": 245,
    "composition": "Sucralfate 1000mg + Oxetacaine 20mg",
    "popular": true
  },
  {
    "name": "Cremaffin Liquid 225ml",
    "category": "Antacid",
    "mrp": 260,
    "composition": "Liquid Paraffin + Milk of Magnesia",
    "popular": true
  },
  {
    "name": "Cremaffin Plus 225ml",
    "category": "Antacid",
    "mrp": 290,
    "composition": "Liquid Paraffin + Magnesium + Sodium Picosulfate",
    "popular": false
  },
  {
    "name": "Duphalac Syrup 150ml",
    "category": "Antacid",
    "mrp": 325,
    "composition": "Lactulose 10g/15ml Solution",
    "popular": true
  },
  {
    "name": "Duphalac Syrup 450ml",
    "category": "Antacid",
    "mrp": 740,
    "composition": "Lactulose 10g/15ml Solution",
    "popular": false
  },
  {
    "name": "Dulcoflex 5mg Tablet",
    "category": "Antacid",
    "mrp": 14,
    "composition": "Bisacodyl 5mg",
    "popular": false
  },
  {
    "name": "Pegmove Powder 119g",
    "category": "Antacid",
    "mrp": 360,
    "composition": "Polyethylene Glycol 3350",
    "popular": false
  },
  {
    "name": "Softovac Bowel Regulator 100g",
    "category": "Antacid",
    "mrp": 195,
    "composition": "Ayurvedic Isabgol Fiber Granules",
    "popular": false
  },
  {
    "name": "Isabgol Husk 100g",
    "category": "Antacid",
    "mrp": 110,
    "composition": "Psyllium Husk 100%",
    "popular": false
  },
  {
    "name": "Econorm Sachet 250mg",
    "category": "Antacid",
    "mrp": 55,
    "composition": "Saccharomyces boulardii 250mg",
    "popular": true
  },
  {
    "name": "Darolac Capsule",
    "category": "Antacid",
    "mrp": 115,
    "composition": "Probiotics Blend (Lactobacillus + Bifidobacterium)",
    "popular": false
  },
  {
    "name": "Sporlac-DS Tablet",
    "category": "Antacid",
    "mrp": 110,
    "composition": "Lactobacillus sporogenes 120 Million Spores",
    "popular": true
  },
  {
    "name": "Vizylac Capsule",
    "category": "Antacid",
    "mrp": 68,
    "composition": "Lactic Acid Bacillus + Vitamin B Complex",
    "popular": false
  },
  {
    "name": "Bifilac Capsule",
    "category": "Antacid",
    "mrp": 145,
    "composition": "Multi-strain Probiotics & Prebiotics",
    "popular": false
  },
  {
    "name": "Udiliv 300 Tablet",
    "category": "Antacid",
    "mrp": 480,
    "composition": "Ursodeoxycholic Acid 300mg",
    "popular": true
  },
  {
    "name": "Udiliv 150 Tablet",
    "category": "Antacid",
    "mrp": 260,
    "composition": "Ursodeoxycholic Acid 150mg",
    "popular": false
  },
  {
    "name": "Ursobil 300 Tablet",
    "category": "Antacid",
    "mrp": 460,
    "composition": "Ursodeoxycholic Acid 300mg",
    "popular": false
  },
  {
    "name": "Liv.52 DS Tablet 60s",
    "category": "Antacid",
    "mrp": 175,
    "composition": "Herbal Ayurvedic Liver Protector",
    "popular": true
  },
  {
    "name": "Liv.52 Syrup 200ml",
    "category": "Antacid",
    "mrp": 145,
    "composition": "Herbal Liver Tonic",
    "popular": false
  },
  {
    "name": "Hepamerz Granules Sachet",
    "category": "Antacid",
    "mrp": 125,
    "composition": "L-Ornithine L-Aspartate 3g",
    "popular": false
  },
  {
    "name": "Silybon 140 Tablet",
    "category": "Antacid",
    "mrp": 240,
    "composition": "Silymarin 140mg (Milk Thistle Extract)",
    "popular": false
  },
  {
    "name": "Telma 40 Tablet",
    "category": "Blood Pressure",
    "mrp": 215,
    "composition": "Telmisartan 40mg",
    "popular": true
  },
  {
    "name": "Telma 20 Tablet",
    "category": "Blood Pressure",
    "mrp": 120,
    "composition": "Telmisartan 20mg",
    "popular": false
  },
  {
    "name": "Telma 80 Tablet",
    "category": "Blood Pressure",
    "mrp": 345,
    "composition": "Telmisartan 80mg",
    "popular": false
  },
  {
    "name": "Telma-H Tablet",
    "category": "Blood Pressure",
    "mrp": 295,
    "composition": "Telmisartan 40mg + Hydrochlorothiazide 12.5mg",
    "popular": true
  },
  {
    "name": "Telma-H 80 Tablet",
    "category": "Blood Pressure",
    "mrp": 420,
    "composition": "Telmisartan 80mg + Hydrochlorothiazide 12.5mg",
    "popular": false
  },
  {
    "name": "Telma-AM Tablet",
    "category": "Blood Pressure",
    "mrp": 310,
    "composition": "Telmisartan 40mg + Amlodipine 5mg",
    "popular": true
  },
  {
    "name": "Telma-ACT 40/5/12.5",
    "category": "Blood Pressure",
    "mrp": 380,
    "composition": "Telmisartan + Amlodipine + Chlorthalidone",
    "popular": false
  },
  {
    "name": "Telmikind 40 Tablet",
    "category": "Blood Pressure",
    "mrp": 85,
    "composition": "Telmisartan 40mg",
    "popular": true
  },
  {
    "name": "Telmikind 20 Tablet",
    "category": "Blood Pressure",
    "mrp": 48,
    "composition": "Telmisartan 20mg",
    "popular": false
  },
  {
    "name": "Telmikind-H Tablet",
    "category": "Blood Pressure",
    "mrp": 125,
    "composition": "Telmisartan 40mg + Hydrochlorothiazide 12.5mg",
    "popular": false
  },
  {
    "name": "Telmikind-AM Tablet",
    "category": "Blood Pressure",
    "mrp": 135,
    "composition": "Telmisartan 40mg + Amlodipine 5mg",
    "popular": false
  },
  {
    "name": "Telvas 40 Tablet",
    "category": "Blood Pressure",
    "mrp": 140,
    "composition": "Telmisartan 40mg",
    "popular": false
  },
  {
    "name": "Telvas 20 Tablet",
    "category": "Blood Pressure",
    "mrp": 80,
    "composition": "Telmisartan 20mg",
    "popular": false
  },
  {
    "name": "Telvas-H 40/12.5",
    "category": "Blood Pressure",
    "mrp": 195,
    "composition": "Telmisartan 40mg + Hydrochlorothiazide 12.5mg",
    "popular": false
  },
  {
    "name": "Telvas-AM Tablet",
    "category": "Blood Pressure",
    "mrp": 210,
    "composition": "Telmisartan 40mg + Amlodipine 5mg",
    "popular": false
  },
  {
    "name": "Telpres 40 Tablet",
    "category": "Blood Pressure",
    "mrp": 130,
    "composition": "Telmisartan 40mg",
    "popular": false
  },
  {
    "name": "Telpres-H 40/12.5",
    "category": "Blood Pressure",
    "mrp": 185,
    "composition": "Telmisartan + Hydrochlorothiazide",
    "popular": false
  },
  {
    "name": "Amlong 5 Tablet",
    "category": "Blood Pressure",
    "mrp": 75,
    "composition": "Amlodipine Besylate 5mg",
    "popular": true
  },
  {
    "name": "Amlong 2.5 Tablet",
    "category": "Blood Pressure",
    "mrp": 45,
    "composition": "Amlodipine Besylate 2.5mg",
    "popular": false
  },
  {
    "name": "Amlong 10 Tablet",
    "category": "Blood Pressure",
    "mrp": 125,
    "composition": "Amlodipine Besylate 10mg",
    "popular": false
  },
  {
    "name": "Amlong-A Tablet",
    "category": "Blood Pressure",
    "mrp": 110,
    "composition": "Amlodipine 5mg + Atenolol 50mg",
    "popular": false
  },
  {
    "name": "Amlong-H Tablet",
    "category": "Blood Pressure",
    "mrp": 115,
    "composition": "Amlodipine 5mg + Hydrochlorothiazide 12.5mg",
    "popular": false
  },
  {
    "name": "Amlodac 5 Tablet",
    "category": "Blood Pressure",
    "mrp": 68,
    "composition": "Amlodipine 5mg",
    "popular": false
  },
  {
    "name": "Amlodac 2.5 Tablet",
    "category": "Blood Pressure",
    "mrp": 40,
    "composition": "Amlodipine 2.5mg",
    "popular": false
  },
  {
    "name": "Stamlo 5 Tablet",
    "category": "Blood Pressure",
    "mrp": 120,
    "composition": "S-Amlodipine 2.5mg",
    "popular": false
  },
  {
    "name": "Stamlo 2.5 Tablet",
    "category": "Blood Pressure",
    "mrp": 70,
    "composition": "S-Amlodipine 1.25mg",
    "popular": false
  },
  {
    "name": "Stamlo-Beta Tablet",
    "category": "Blood Pressure",
    "mrp": 155,
    "composition": "S-Amlodipine 2.5mg + Atenolol 50mg",
    "popular": false
  },
  {
    "name": "Cilacar 10 Tablet",
    "category": "Blood Pressure",
    "mrp": 165,
    "composition": "Cilnidipine 10mg",
    "popular": true
  },
  {
    "name": "Cilacar 5 Tablet",
    "category": "Blood Pressure",
    "mrp": 95,
    "composition": "Cilnidipine 5mg",
    "popular": false
  },
  {
    "name": "Cilacar 20 Tablet",
    "category": "Blood Pressure",
    "mrp": 280,
    "composition": "Cilnidipine 20mg",
    "popular": false
  },
  {
    "name": "Cilacar-T 10/40",
    "category": "Blood Pressure",
    "mrp": 260,
    "composition": "Cilnidipine 10mg + Telmisartan 40mg",
    "popular": true
  },
  {
    "name": "Cilacar-M 10/25",
    "category": "Blood Pressure",
    "mrp": 240,
    "composition": "Cilnidipine 10mg + Metoprolol Succinate 25mg",
    "popular": false
  },
  {
    "name": "Starpress-XL 25 Tablet",
    "category": "Blood Pressure",
    "mrp": 110,
    "composition": "Metoprolol Succinate 25mg Extended Release",
    "popular": true
  },
  {
    "name": "Starpress-XL 50 Tablet",
    "category": "Blood Pressure",
    "mrp": 175,
    "composition": "Metoprolol Succinate 50mg Extended Release",
    "popular": true
  },
  {
    "name": "Starpress-XL 12.5 Tablet",
    "category": "Blood Pressure",
    "mrp": 68,
    "composition": "Metoprolol Succinate 12.5mg ER",
    "popular": false
  },
  {
    "name": "Starpress-AM 25/5",
    "category": "Blood Pressure",
    "mrp": 160,
    "composition": "Metoprolol 25mg + Amlodipine 5mg",
    "popular": false
  },
  {
    "name": "Betaloc 25mg Tablet",
    "category": "Blood Pressure",
    "mrp": 95,
    "composition": "Metoprolol Tartrate 25mg",
    "popular": false
  },
  {
    "name": "Betaloc 50mg Tablet",
    "category": "Blood Pressure",
    "mrp": 145,
    "composition": "Metoprolol Tartrate 50mg",
    "popular": false
  },
  {
    "name": "Metolar 25mg Tablet",
    "category": "Blood Pressure",
    "mrp": 88,
    "composition": "Metoprolol Tartrate 25mg",
    "popular": false
  },
  {
    "name": "Metolar 50mg Tablet",
    "category": "Blood Pressure",
    "mrp": 140,
    "composition": "Metoprolol Tartrate 50mg",
    "popular": false
  },
  {
    "name": "Metolar-XR 50 Tablet",
    "category": "Blood Pressure",
    "mrp": 165,
    "composition": "Metoprolol Succinate 50mg ER",
    "popular": false
  },
  {
    "name": "Concor 5 Tablet",
    "category": "Blood Pressure",
    "mrp": 130,
    "composition": "Bisoprolol Fumarate 5mg",
    "popular": true
  },
  {
    "name": "Concor 2.5 Tablet",
    "category": "Blood Pressure",
    "mrp": 82,
    "composition": "Bisoprolol Fumarate 2.5mg",
    "popular": false
  },
  {
    "name": "Concor-COR 1.25",
    "category": "Blood Pressure",
    "mrp": 55,
    "composition": "Bisoprolol Fumarate 1.25mg",
    "popular": false
  },
  {
    "name": "Nebicard 5mg Tablet",
    "category": "Blood Pressure",
    "mrp": 155,
    "composition": "Nebivolol 5mg",
    "popular": false
  },
  {
    "name": "Nebicard 2.5mg Tablet",
    "category": "Blood Pressure",
    "mrp": 92,
    "composition": "Nebivolol 2.5mg",
    "popular": false
  },
  {
    "name": "Nebistar 5mg Tablet",
    "category": "Blood Pressure",
    "mrp": 160,
    "composition": "Nebivolol 5mg",
    "popular": false
  },
  {
    "name": "Cardivas 3.125 Tablet",
    "category": "Blood Pressure",
    "mrp": 65,
    "composition": "Carvedilol 3.125mg",
    "popular": false
  },
  {
    "name": "Cardivas 6.25 Tablet",
    "category": "Blood Pressure",
    "mrp": 95,
    "composition": "Carvedilol 6.25mg",
    "popular": false
  },
  {
    "name": "Cardivas 12.5 Tablet",
    "category": "Blood Pressure",
    "mrp": 140,
    "composition": "Carvedilol 12.5mg",
    "popular": false
  },
  {
    "name": "Cardivas 25 Tablet",
    "category": "Blood Pressure",
    "mrp": 215,
    "composition": "Carvedilol 25mg",
    "popular": false
  },
  {
    "name": "Losar 50 Tablet",
    "category": "Blood Pressure",
    "mrp": 160,
    "composition": "Losartan Potassium 50mg",
    "popular": true
  },
  {
    "name": "Losar 25 Tablet",
    "category": "Blood Pressure",
    "mrp": 95,
    "composition": "Losartan Potassium 25mg",
    "popular": false
  },
  {
    "name": "Losar-H Tablet",
    "category": "Blood Pressure",
    "mrp": 210,
    "composition": "Losartan 50mg + Hydrochlorothiazide 12.5mg",
    "popular": false
  },
  {
    "name": "Repace 50 Tablet",
    "category": "Blood Pressure",
    "mrp": 150,
    "composition": "Losartan Potassium 50mg",
    "popular": false
  },
  {
    "name": "Repace 25 Tablet",
    "category": "Blood Pressure",
    "mrp": 90,
    "composition": "Losartan Potassium 25mg",
    "popular": false
  },
  {
    "name": "Repace-H Tablet",
    "category": "Blood Pressure",
    "mrp": 200,
    "composition": "Losartan + Hydrochlorothiazide",
    "popular": false
  },
  {
    "name": "Olmat 20 Tablet",
    "category": "Blood Pressure",
    "mrp": 145,
    "composition": "Olmesartan Medoxomil 20mg",
    "popular": false
  },
  {
    "name": "Olmat 40 Tablet",
    "category": "Blood Pressure",
    "mrp": 260,
    "composition": "Olmesartan Medoxomil 40mg",
    "popular": false
  },
  {
    "name": "Olmat-H 20/12.5",
    "category": "Blood Pressure",
    "mrp": 195,
    "composition": "Olmesartan 20mg + Hydrochlorothiazide 12.5mg",
    "popular": false
  },
  {
    "name": "Olmesar 20 Tablet",
    "category": "Blood Pressure",
    "mrp": 140,
    "composition": "Olmesartan Medoxomil 20mg",
    "popular": false
  },
  {
    "name": "Cardace 2.5 Tablet",
    "category": "Blood Pressure",
    "mrp": 90,
    "composition": "Ramipril 2.5mg",
    "popular": false
  },
  {
    "name": "Cardace 5 Tablet",
    "category": "Blood Pressure",
    "mrp": 145,
    "composition": "Ramipril 5mg",
    "popular": false
  },
  {
    "name": "Cardace 1.25 Tablet",
    "category": "Blood Pressure",
    "mrp": 55,
    "composition": "Ramipril 1.25mg",
    "popular": false
  },
  {
    "name": "Cardace-H 5/12.5",
    "category": "Blood Pressure",
    "mrp": 185,
    "composition": "Ramipril 5mg + Hydrochlorothiazide 12.5mg",
    "popular": false
  },
  {
    "name": "Envas 5mg Tablet",
    "category": "Blood Pressure",
    "mrp": 70,
    "composition": "Enalapril Maleate 5mg",
    "popular": false
  },
  {
    "name": "Envas 2.5mg Tablet",
    "category": "Blood Pressure",
    "mrp": 45,
    "composition": "Enalapril Maleate 2.5mg",
    "popular": false
  },
  {
    "name": "Ecosprin 75mg Tablet",
    "category": "Blood Pressure",
    "mrp": 12,
    "composition": "Aspirin (Acetylsalicylic Acid) 75mg",
    "popular": true
  },
  {
    "name": "Ecosprin 150mg Tablet",
    "category": "Blood Pressure",
    "mrp": 18,
    "composition": "Aspirin 150mg",
    "popular": true
  },
  {
    "name": "Ecosprin-AV 75/20",
    "category": "Blood Pressure",
    "mrp": 85,
    "composition": "Aspirin 75mg + Atorvastatin 20mg",
    "popular": true
  },
  {
    "name": "Ecosprin-AV 75/10",
    "category": "Blood Pressure",
    "mrp": 65,
    "composition": "Aspirin 75mg + Atorvastatin 10mg",
    "popular": false
  },
  {
    "name": "Ecosprin Gold 10 Capsule",
    "category": "Blood Pressure",
    "mrp": 125,
    "composition": "Aspirin 75mg + Clopidogrel 75mg + Atorvastatin 10mg",
    "popular": false
  },
  {
    "name": "Ecosprin Gold 20 Capsule",
    "category": "Blood Pressure",
    "mrp": 165,
    "composition": "Aspirin 75mg + Clopidogrel 75mg + Atorvastatin 20mg",
    "popular": false
  },
  {
    "name": "Deplatt 75 Tablet",
    "category": "Blood Pressure",
    "mrp": 135,
    "composition": "Clopidogrel 75mg",
    "popular": true
  },
  {
    "name": "Deplatt-A 75 Tablet",
    "category": "Blood Pressure",
    "mrp": 145,
    "composition": "Clopidogrel 75mg + Aspirin 75mg",
    "popular": false
  },
  {
    "name": "Clopilet 75 Tablet",
    "category": "Blood Pressure",
    "mrp": 120,
    "composition": "Clopidogrel 75mg",
    "popular": false
  },
  {
    "name": "Clopilet-A 75 Tablet",
    "category": "Blood Pressure",
    "mrp": 135,
    "composition": "Clopidogrel 75mg + Aspirin 75mg",
    "popular": false
  },
  {
    "name": "Brilinta 90mg Tablet",
    "category": "Blood Pressure",
    "mrp": 890,
    "composition": "Ticagrelor 90mg",
    "popular": true
  },
  {
    "name": "Brilinta 60mg Tablet",
    "category": "Blood Pressure",
    "mrp": 780,
    "composition": "Ticagrelor 60mg",
    "popular": false
  },
  {
    "name": "Atorva 10 Tablet",
    "category": "Blood Pressure",
    "mrp": 125,
    "composition": "Atorvastatin 10mg",
    "popular": true
  },
  {
    "name": "Atorva 20 Tablet",
    "category": "Blood Pressure",
    "mrp": 240,
    "composition": "Atorvastatin 20mg",
    "popular": true
  },
  {
    "name": "Atorva 40 Tablet",
    "category": "Blood Pressure",
    "mrp": 410,
    "composition": "Atorvastatin 40mg",
    "popular": false
  },
  {
    "name": "Atorva 5 Tablet",
    "category": "Blood Pressure",
    "mrp": 75,
    "composition": "Atorvastatin 5mg",
    "popular": false
  },
  {
    "name": "Atorva-TG 10/160",
    "category": "Blood Pressure",
    "mrp": 260,
    "composition": "Atorvastatin 10mg + Fenofibrate 160mg",
    "popular": false
  },
  {
    "name": "Storvas 10 Tablet",
    "category": "Blood Pressure",
    "mrp": 120,
    "composition": "Atorvastatin 10mg",
    "popular": false
  },
  {
    "name": "Storvas 20 Tablet",
    "category": "Blood Pressure",
    "mrp": 230,
    "composition": "Atorvastatin 20mg",
    "popular": false
  },
  {
    "name": "Lipicure 10 Tablet",
    "category": "Blood Pressure",
    "mrp": 118,
    "composition": "Atorvastatin 10mg",
    "popular": false
  },
  {
    "name": "Lipicure 20 Tablet",
    "category": "Blood Pressure",
    "mrp": 225,
    "composition": "Atorvastatin 20mg",
    "popular": false
  },
  {
    "name": "Tonact 10 Tablet",
    "category": "Blood Pressure",
    "mrp": 115,
    "composition": "Atorvastatin 10mg",
    "popular": false
  },
  {
    "name": "Tonact 20 Tablet",
    "category": "Blood Pressure",
    "mrp": 220,
    "composition": "Atorvastatin 20mg",
    "popular": false
  },
  {
    "name": "Rosuvas 10 Tablet",
    "category": "Blood Pressure",
    "mrp": 250,
    "composition": "Rosuvastatin 10mg",
    "popular": true
  },
  {
    "name": "Rosuvas 20 Tablet",
    "category": "Blood Pressure",
    "mrp": 440,
    "composition": "Rosuvastatin 20mg",
    "popular": false
  },
  {
    "name": "Rosuvas 5 Tablet",
    "category": "Blood Pressure",
    "mrp": 140,
    "composition": "Rosuvastatin 5mg",
    "popular": false
  },
  {
    "name": "Rosuvas-F 10/160",
    "category": "Blood Pressure",
    "mrp": 340,
    "composition": "Rosuvastatin 10mg + Fenofibrate 160mg",
    "popular": false
  },
  {
    "name": "Rozavel 10 Tablet",
    "category": "Blood Pressure",
    "mrp": 210,
    "composition": "Rosuvastatin 10mg",
    "popular": true
  },
  {
    "name": "Rozavel 20 Tablet",
    "category": "Blood Pressure",
    "mrp": 390,
    "composition": "Rosuvastatin 20mg",
    "popular": false
  },
  {
    "name": "Rozavel 5 Tablet",
    "category": "Blood Pressure",
    "mrp": 125,
    "composition": "Rosuvastatin 5mg",
    "popular": false
  },
  {
    "name": "Rozavel-F 10/160",
    "category": "Blood Pressure",
    "mrp": 310,
    "composition": "Rosuvastatin + Fenofibrate",
    "popular": false
  },
  {
    "name": "Crestor 10mg Tablet",
    "category": "Blood Pressure",
    "mrp": 320,
    "composition": "Rosuvastatin 10mg",
    "popular": false
  },
  {
    "name": "Crestor 20mg Tablet",
    "category": "Blood Pressure",
    "mrp": 580,
    "composition": "Rosuvastatin 20mg",
    "popular": false
  },
  {
    "name": "Dytor 10 Tablet",
    "category": "Blood Pressure",
    "mrp": 95,
    "composition": "Torsemide 10mg",
    "popular": true
  },
  {
    "name": "Dytor 20 Tablet",
    "category": "Blood Pressure",
    "mrp": 165,
    "composition": "Torsemide 20mg",
    "popular": false
  },
  {
    "name": "Dytor 5 Tablet",
    "category": "Blood Pressure",
    "mrp": 55,
    "composition": "Torsemide 5mg",
    "popular": false
  },
  {
    "name": "Dytor Plus 10/50",
    "category": "Blood Pressure",
    "mrp": 175,
    "composition": "Torsemide 10mg + Spironolactone 50mg",
    "popular": false
  },
  {
    "name": "Dytor Plus 20/50",
    "category": "Blood Pressure",
    "mrp": 240,
    "composition": "Torsemide 20mg + Spironolactone 50mg",
    "popular": false
  },
  {
    "name": "Lasix 40mg Tablet",
    "category": "Blood Pressure",
    "mrp": 18,
    "composition": "Furosemide 40mg",
    "popular": true
  },
  {
    "name": "Lasix Injection 2ml",
    "category": "Blood Pressure",
    "mrp": 10,
    "composition": "Furosemide 10mg/ml",
    "popular": false
  },
  {
    "name": "Aldactone 25 Tablet",
    "category": "Blood Pressure",
    "mrp": 62,
    "composition": "Spironolactone 25mg",
    "popular": false
  },
  {
    "name": "Aldactone 50 Tablet",
    "category": "Blood Pressure",
    "mrp": 105,
    "composition": "Spironolactone 50mg",
    "popular": false
  },
  {
    "name": "Aldactone 100 Tablet",
    "category": "Blood Pressure",
    "mrp": 195,
    "composition": "Spironolactone 100mg",
    "popular": false
  },
  {
    "name": "Arkamin 100mcg Tablet",
    "category": "Blood Pressure",
    "mrp": 75,
    "composition": "Clonidine Hydrochloride 100mcg",
    "popular": false
  },
  {
    "name": "Minipress-XL 2.5mg",
    "category": "Blood Pressure",
    "mrp": 280,
    "composition": "Prazosin Hydrochloride 2.5mg",
    "popular": false
  },
  {
    "name": "Minipress-XL 5mg",
    "category": "Blood Pressure",
    "mrp": 460,
    "composition": "Prazosin Hydrochloride 5mg",
    "popular": false
  },
  {
    "name": "Sorbitrate 5mg Tablet",
    "category": "Blood Pressure",
    "mrp": 35,
    "composition": "Isosorbide Dinitrate 5mg Sublingual",
    "popular": false
  },
  {
    "name": "Sorbitrate 10mg Tablet",
    "category": "Blood Pressure",
    "mrp": 48,
    "composition": "Isosorbide Dinitrate 10mg",
    "popular": false
  },
  {
    "name": "Monotrate 20 Tablet",
    "category": "Blood Pressure",
    "mrp": 60,
    "composition": "Isosorbide Mononitrate 20mg",
    "popular": false
  },
  {
    "name": "Monotrate 40 Tablet",
    "category": "Blood Pressure",
    "mrp": 105,
    "composition": "Isosorbide Mononitrate 40mg",
    "popular": false
  },
  {
    "name": "Nitrocontin 2.6mg",
    "category": "Blood Pressure",
    "mrp": 175,
    "composition": "Nitroglycerin 2.6mg Controlled Release",
    "popular": false
  },
  {
    "name": "Nitrocontin 6.4mg",
    "category": "Blood Pressure",
    "mrp": 320,
    "composition": "Nitroglycerin 6.4mg Controlled Release",
    "popular": false
  },
  {
    "name": "Glycomet 500 SR Tablet",
    "category": "Diabetes",
    "mrp": 48,
    "composition": "Metformin Hydrochloride 500mg SR",
    "popular": true
  },
  {
    "name": "Glycomet 1000 SR Tablet",
    "category": "Diabetes",
    "mrp": 75,
    "composition": "Metformin Hydrochloride 1000mg SR",
    "popular": true
  },
  {
    "name": "Glycomet 850 Tablet",
    "category": "Diabetes",
    "mrp": 60,
    "composition": "Metformin Hydrochloride 850mg",
    "popular": false
  },
  {
    "name": "Glycomet 250 Tablet",
    "category": "Diabetes",
    "mrp": 28,
    "composition": "Metformin Hydrochloride 250mg",
    "popular": false
  },
  {
    "name": "Glycomet-GP 1 Tablet",
    "category": "Diabetes",
    "mrp": 185,
    "composition": "Glimepiride 1mg + Metformin 500mg SR",
    "popular": true
  },
  {
    "name": "Glycomet-GP 2 Tablet",
    "category": "Diabetes",
    "mrp": 245,
    "composition": "Glimepiride 2mg + Metformin 500mg SR",
    "popular": true
  },
  {
    "name": "Glycomet-GP 3 Tablet",
    "category": "Diabetes",
    "mrp": 310,
    "composition": "Glimepiride 3mg + Metformin 500mg SR",
    "popular": false
  },
  {
    "name": "Glycomet-GP 0.5 Tablet",
    "category": "Diabetes",
    "mrp": 135,
    "composition": "Glimepiride 0.5mg + Metformin 500mg SR",
    "popular": false
  },
  {
    "name": "Glycomet-GP 1 Forte",
    "category": "Diabetes",
    "mrp": 220,
    "composition": "Glimepiride 1mg + Metformin 1000mg SR",
    "popular": false
  },
  {
    "name": "Glycomet-GP 2 Forte",
    "category": "Diabetes",
    "mrp": 275,
    "composition": "Glimepiride 2mg + Metformin 1000mg SR",
    "popular": true
  },
  {
    "name": "Glycomet Trio 1 Tablet",
    "category": "Diabetes",
    "mrp": 260,
    "composition": "Glimepiride 1mg + Metformin 500mg + Voglibose 0.2mg",
    "popular": false
  },
  {
    "name": "Glycomet Trio 2 Tablet",
    "category": "Diabetes",
    "mrp": 320,
    "composition": "Glimepiride 2mg + Metformin 500mg + Voglibose 0.2mg",
    "popular": true
  },
  {
    "name": "Gluconorm-G 1 Tablet",
    "category": "Diabetes",
    "mrp": 175,
    "composition": "Glimepiride 1mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Gluconorm-G 2 Tablet",
    "category": "Diabetes",
    "mrp": 235,
    "composition": "Glimepiride 2mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Gluconorm-G 1 Forte",
    "category": "Diabetes",
    "mrp": 210,
    "composition": "Glimepiride 1mg + Metformin 1000mg",
    "popular": false
  },
  {
    "name": "Gluconorm-G 2 Forte",
    "category": "Diabetes",
    "mrp": 265,
    "composition": "Glimepiride 2mg + Metformin 1000mg",
    "popular": false
  },
  {
    "name": "Amaryl 1mg Tablet",
    "category": "Diabetes",
    "mrp": 140,
    "composition": "Glimepiride 1mg",
    "popular": true
  },
  {
    "name": "Amaryl 2mg Tablet",
    "category": "Diabetes",
    "mrp": 225,
    "composition": "Glimepiride 2mg",
    "popular": true
  },
  {
    "name": "Amaryl 3mg Tablet",
    "category": "Diabetes",
    "mrp": 310,
    "composition": "Glimepiride 3mg",
    "popular": false
  },
  {
    "name": "Amaryl 4mg Tablet",
    "category": "Diabetes",
    "mrp": 380,
    "composition": "Glimepiride 4mg",
    "popular": false
  },
  {
    "name": "Amaryl-M 1mg Tablet",
    "category": "Diabetes",
    "mrp": 235,
    "composition": "Glimepiride 1mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Amaryl-M 2mg Tablet",
    "category": "Diabetes",
    "mrp": 315,
    "composition": "Glimepiride 2mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Amaryl-M 2 Forte",
    "category": "Diabetes",
    "mrp": 360,
    "composition": "Glimepiride 2mg + Metformin 1000mg",
    "popular": false
  },
  {
    "name": "Januvia 100mg Tablet",
    "category": "Diabetes",
    "mrp": 620,
    "composition": "Sitagliptin 100mg",
    "popular": true
  },
  {
    "name": "Januvia 50mg Tablet",
    "category": "Diabetes",
    "mrp": 390,
    "composition": "Sitagliptin 50mg",
    "popular": false
  },
  {
    "name": "Janumet 50/500 Tablet",
    "category": "Diabetes",
    "mrp": 380,
    "composition": "Sitagliptin 50mg + Metformin 500mg",
    "popular": true
  },
  {
    "name": "Janumet 50/1000 Tablet",
    "category": "Diabetes",
    "mrp": 440,
    "composition": "Sitagliptin 50mg + Metformin 1000mg",
    "popular": false
  },
  {
    "name": "Janumet XR 50/500",
    "category": "Diabetes",
    "mrp": 410,
    "composition": "Sitagliptin 50mg + Metformin 500mg XR",
    "popular": false
  },
  {
    "name": "Janumet XR 50/1000",
    "category": "Diabetes",
    "mrp": 460,
    "composition": "Sitagliptin 50mg + Metformin 1000mg XR",
    "popular": false
  },
  {
    "name": "Galvus 50mg Tablet",
    "category": "Diabetes",
    "mrp": 280,
    "composition": "Vildagliptin 50mg",
    "popular": true
  },
  {
    "name": "Galvus Met 50/500",
    "category": "Diabetes",
    "mrp": 320,
    "composition": "Vildagliptin 50mg + Metformin 500mg",
    "popular": true
  },
  {
    "name": "Galvus Met 50/850",
    "category": "Diabetes",
    "mrp": 350,
    "composition": "Vildagliptin 50mg + Metformin 850mg",
    "popular": false
  },
  {
    "name": "Galvus Met 50/1000",
    "category": "Diabetes",
    "mrp": 380,
    "composition": "Vildagliptin 50mg + Metformin 1000mg",
    "popular": false
  },
  {
    "name": "Jalra 50mg Tablet",
    "category": "Diabetes",
    "mrp": 275,
    "composition": "Vildagliptin 50mg",
    "popular": false
  },
  {
    "name": "Jalra-M 50/500 Tablet",
    "category": "Diabetes",
    "mrp": 310,
    "composition": "Vildagliptin 50mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Jalra-M 50/1000 Tablet",
    "category": "Diabetes",
    "mrp": 375,
    "composition": "Vildagliptin 50mg + Metformin 1000mg",
    "popular": false
  },
  {
    "name": "Zomelis 50mg Tablet",
    "category": "Diabetes",
    "mrp": 260,
    "composition": "Vildagliptin 50mg",
    "popular": false
  },
  {
    "name": "Zomelis-Met 50/500",
    "category": "Diabetes",
    "mrp": 295,
    "composition": "Vildagliptin 50mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Zomelis-Met 50/1000",
    "category": "Diabetes",
    "mrp": 350,
    "composition": "Vildagliptin 50mg + Metformin 1000mg",
    "popular": false
  },
  {
    "name": "Trajenta 5mg Tablet",
    "category": "Diabetes",
    "mrp": 890,
    "composition": "Linagliptin 5mg",
    "popular": false
  },
  {
    "name": "Trajenta Duo 2.5/500",
    "category": "Diabetes",
    "mrp": 480,
    "composition": "Linagliptin 2.5mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Trajenta Duo 2.5/1000",
    "category": "Diabetes",
    "mrp": 540,
    "composition": "Linagliptin 2.5mg + Metformin 1000mg",
    "popular": false
  },
  {
    "name": "Teneliglip 20mg Tablet",
    "category": "Diabetes",
    "mrp": 110,
    "composition": "Teneligliptin 20mg",
    "popular": false
  },
  {
    "name": "Teneliglip-M 20/500",
    "category": "Diabetes",
    "mrp": 180,
    "composition": "Teneligliptin 20mg + Metformin 500mg",
    "popular": true
  },
  {
    "name": "Teneliglip-M 20/1000",
    "category": "Diabetes",
    "mrp": 220,
    "composition": "Teneligliptin 20mg + Metformin 1000mg",
    "popular": false
  },
  {
    "name": "Zita 20mg Tablet",
    "category": "Diabetes",
    "mrp": 115,
    "composition": "Teneligliptin 20mg",
    "popular": false
  },
  {
    "name": "Zita-Met 20/500",
    "category": "Diabetes",
    "mrp": 185,
    "composition": "Teneligliptin 20mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Forxiga 10mg Tablet",
    "category": "Diabetes",
    "mrp": 620,
    "composition": "Dapagliflozin 10mg",
    "popular": true
  },
  {
    "name": "Forxiga 5mg Tablet",
    "category": "Diabetes",
    "mrp": 390,
    "composition": "Dapagliflozin 5mg",
    "popular": false
  },
  {
    "name": "Xigduo XR 10/500",
    "category": "Diabetes",
    "mrp": 480,
    "composition": "Dapagliflozin 10mg + Metformin 500mg XR",
    "popular": false
  },
  {
    "name": "Xigduo XR 10/1000",
    "category": "Diabetes",
    "mrp": 560,
    "composition": "Dapagliflozin 10mg + Metformin 1000mg XR",
    "popular": false
  },
  {
    "name": "Dapaglyn 10mg Tablet",
    "category": "Diabetes",
    "mrp": 185,
    "composition": "Dapagliflozin 10mg",
    "popular": false
  },
  {
    "name": "Dapaglyn-M 10/500",
    "category": "Diabetes",
    "mrp": 245,
    "composition": "Dapagliflozin 10mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Jardiance 10mg Tablet",
    "category": "Diabetes",
    "mrp": 640,
    "composition": "Empagliflozin 10mg",
    "popular": true
  },
  {
    "name": "Jardiance 25mg Tablet",
    "category": "Diabetes",
    "mrp": 880,
    "composition": "Empagliflozin 25mg",
    "popular": false
  },
  {
    "name": "Jardiance Duo 12.5/500",
    "category": "Diabetes",
    "mrp": 560,
    "composition": "Empagliflozin 12.5mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Jardiance Duo 12.5/1000",
    "category": "Diabetes",
    "mrp": 620,
    "composition": "Empagliflozin 12.5mg + Metformin 1000mg",
    "popular": false
  },
  {
    "name": "Gibtulio 10mg Tablet",
    "category": "Diabetes",
    "mrp": 480,
    "composition": "Empagliflozin 10mg",
    "popular": false
  },
  {
    "name": "Gibtulio-Met 10/500",
    "category": "Diabetes",
    "mrp": 420,
    "composition": "Empagliflozin + Metformin",
    "popular": false
  },
  {
    "name": "Daonil 5mg Tablet",
    "category": "Diabetes",
    "mrp": 62,
    "composition": "Glibenclamide 5mg",
    "popular": false
  },
  {
    "name": "Semi-Daonil 2.5mg",
    "category": "Diabetes",
    "mrp": 38,
    "composition": "Glibenclamide 2.5mg",
    "popular": false
  },
  {
    "name": "Glynase-XL 5mg Tablet",
    "category": "Diabetes",
    "mrp": 95,
    "composition": "Glipizide 5mg Extended Release",
    "popular": false
  },
  {
    "name": "Glynase-XL 10mg Tablet",
    "category": "Diabetes",
    "mrp": 155,
    "composition": "Glipizide 10mg Extended Release",
    "popular": false
  },
  {
    "name": "Diamicron 80mg Tablet",
    "category": "Diabetes",
    "mrp": 180,
    "composition": "Gliclazide 80mg",
    "popular": false
  },
  {
    "name": "Diamicron XR 60mg",
    "category": "Diabetes",
    "mrp": 260,
    "composition": "Gliclazide 60mg Modified Release",
    "popular": false
  },
  {
    "name": "Diamicron XR 30mg",
    "category": "Diabetes",
    "mrp": 165,
    "composition": "Gliclazide 30mg Modified Release",
    "popular": false
  },
  {
    "name": "Pioz 15mg Tablet",
    "category": "Diabetes",
    "mrp": 85,
    "composition": "Pioglitazone 15mg",
    "popular": false
  },
  {
    "name": "Pioz 30mg Tablet",
    "category": "Diabetes",
    "mrp": 140,
    "composition": "Pioglitazone 30mg",
    "popular": false
  },
  {
    "name": "Pioz-MF 15/500",
    "category": "Diabetes",
    "mrp": 160,
    "composition": "Pioglitazone 15mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Volibo 0.2mg Tablet",
    "category": "Diabetes",
    "mrp": 145,
    "composition": "Voglibose 0.2mg",
    "popular": false
  },
  {
    "name": "Volibo 0.3mg Tablet",
    "category": "Diabetes",
    "mrp": 195,
    "composition": "Voglibose 0.3mg",
    "popular": false
  },
  {
    "name": "Volibo-M 0.2/500",
    "category": "Diabetes",
    "mrp": 180,
    "composition": "Voglibose 0.2mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Voglimac 0.2 Tablet",
    "category": "Diabetes",
    "mrp": 130,
    "composition": "Voglibose 0.2mg",
    "popular": false
  },
  {
    "name": "Voglimac 0.3 Tablet",
    "category": "Diabetes",
    "mrp": 175,
    "composition": "Voglibose 0.3mg",
    "popular": false
  },
  {
    "name": "Rybelsus 3mg Tablet",
    "category": "Diabetes",
    "mrp": 3200,
    "composition": "Semaglutide 3mg Oral",
    "popular": true
  },
  {
    "name": "Rybelsus 7mg Tablet",
    "category": "Diabetes",
    "mrp": 3800,
    "composition": "Semaglutide 7mg Oral",
    "popular": false
  },
  {
    "name": "Rybelsus 14mg Tablet",
    "category": "Diabetes",
    "mrp": 4400,
    "composition": "Semaglutide 14mg Oral",
    "popular": false
  },
  {
    "name": "Lantus 100IU/ml Solostar",
    "category": "Diabetes",
    "mrp": 720,
    "composition": "Insulin Glargine 100 IU/ml Disposable Pen",
    "popular": true
  },
  {
    "name": "Lantus 100IU/ml Cartridge",
    "category": "Diabetes",
    "mrp": 540,
    "composition": "Insulin Glargine 100 IU/ml 3ml Cartridge",
    "popular": false
  },
  {
    "name": "Lantus 100IU/ml Vial 10ml",
    "category": "Diabetes",
    "mrp": 950,
    "composition": "Insulin Glargine 1000 IU/10ml Vial",
    "popular": false
  },
  {
    "name": "Toujeo 300IU/ml Solostar",
    "category": "Diabetes",
    "mrp": 980,
    "composition": "Insulin Glargine U-300 Pen",
    "popular": false
  },
  {
    "name": "Tresiba 100IU/ml Flextouch",
    "category": "Diabetes",
    "mrp": 1250,
    "composition": "Insulin Degludec 100 IU/ml Pen",
    "popular": false
  },
  {
    "name": "Novorapid 100IU/ml Pen",
    "category": "Diabetes",
    "mrp": 620,
    "composition": "Insulin Aspart Rapid Acting Pen",
    "popular": false
  },
  {
    "name": "Humalog 100IU/ml Kwikpen",
    "category": "Diabetes",
    "mrp": 590,
    "composition": "Insulin Lispro Rapid Acting Pen",
    "popular": false
  },
  {
    "name": "Human Mixtard 30/70 40IU",
    "category": "Diabetes",
    "mrp": 175,
    "composition": "Biphasic Isophane Insulin 40 IU/ml Vial",
    "popular": true
  },
  {
    "name": "Human Mixtard 50/50 40IU",
    "category": "Diabetes",
    "mrp": 185,
    "composition": "Biphasic Isophane Insulin 40 IU/ml Vial",
    "popular": false
  },
  {
    "name": "Human Actrapid 40IU/ml",
    "category": "Diabetes",
    "mrp": 165,
    "composition": "Regular Soluble Insulin 40 IU/ml Vial",
    "popular": false
  },
  {
    "name": "Human Insulatard 40IU/ml",
    "category": "Diabetes",
    "mrp": 170,
    "composition": "Isophane NPH Insulin 40 IU/ml Vial",
    "popular": false
  },
  {
    "name": "Ryzodeg 100IU/ml Flextouch",
    "category": "Diabetes",
    "mrp": 1450,
    "composition": "Insulin Degludec 70% + Insulin Aspart 30%",
    "popular": false
  },
  {
    "name": "Montair-LC Tablet",
    "category": "Allergy & Cold",
    "mrp": 180,
    "composition": "Levocetirizine 5mg + Montelukast 10mg",
    "popular": true
  },
  {
    "name": "Montair 10mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 145,
    "composition": "Montelukast Sodium 10mg",
    "popular": false
  },
  {
    "name": "Montair 5mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 95,
    "composition": "Montelukast Sodium 5mg Chewable",
    "popular": false
  },
  {
    "name": "Montair 4mg Sachet",
    "category": "Allergy & Cold",
    "mrp": 40,
    "composition": "Montelukast Sodium 4mg Granules",
    "popular": false
  },
  {
    "name": "Montair-LC Kid Syrup 60ml",
    "category": "Allergy & Cold",
    "mrp": 98,
    "composition": "Levocetirizine 2.5mg + Montelukast 4mg",
    "popular": false
  },
  {
    "name": "Montair-FX Tablet",
    "category": "Allergy & Cold",
    "mrp": 260,
    "composition": "Fexofenadine 120mg + Montelukast 10mg",
    "popular": false
  },
  {
    "name": "Monticope Tablet",
    "category": "Allergy & Cold",
    "mrp": 165,
    "composition": "Levocetirizine 5mg + Montelukast 10mg",
    "popular": true
  },
  {
    "name": "Monticope Suspension 60ml",
    "category": "Allergy & Cold",
    "mrp": 92,
    "composition": "Levocetirizine + Montelukast Pediatric",
    "popular": false
  },
  {
    "name": "Telekast 10mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 135,
    "composition": "Montelukast Sodium 10mg",
    "popular": false
  },
  {
    "name": "Telekast-L Tablet",
    "category": "Allergy & Cold",
    "mrp": 170,
    "composition": "Montelukast 10mg + Levocetirizine 5mg",
    "popular": false
  },
  {
    "name": "Romilast 10mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 130,
    "composition": "Montelukast Sodium 10mg",
    "popular": false
  },
  {
    "name": "Romilast-L 10/5",
    "category": "Allergy & Cold",
    "mrp": 165,
    "composition": "Montelukast 10mg + Levocetirizine 5mg",
    "popular": false
  },
  {
    "name": "Allegra 120mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 215,
    "composition": "Fexofenadine Hydrochloride 120mg",
    "popular": true
  },
  {
    "name": "Allegra 180mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 265,
    "composition": "Fexofenadine Hydrochloride 180mg",
    "popular": true
  },
  {
    "name": "Allegra 30mg Suspension",
    "category": "Allergy & Cold",
    "mrp": 145,
    "composition": "Fexofenadine 30mg/5ml Suspension",
    "popular": false
  },
  {
    "name": "Allegra-M Tablet",
    "category": "Allergy & Cold",
    "mrp": 275,
    "composition": "Fexofenadine 120mg + Montelukast 10mg",
    "popular": false
  },
  {
    "name": "Fexova 120mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 140,
    "composition": "Fexofenadine Hydrochloride 120mg",
    "popular": false
  },
  {
    "name": "Fexova 180mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 195,
    "composition": "Fexofenadine Hydrochloride 180mg",
    "popular": false
  },
  {
    "name": "Bilashine 20mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 190,
    "composition": "Bilastine 20mg",
    "popular": true
  },
  {
    "name": "Bilasure 20mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 185,
    "composition": "Bilastine 20mg",
    "popular": false
  },
  {
    "name": "Bilasure-M Tablet",
    "category": "Allergy & Cold",
    "mrp": 280,
    "composition": "Bilastine 20mg + Montelukast 10mg",
    "popular": false
  },
  {
    "name": "Levocet 5mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 65,
    "composition": "Levocetirizine Hydrochloride 5mg",
    "popular": true
  },
  {
    "name": "Levocet Syrup 60ml",
    "category": "Allergy & Cold",
    "mrp": 45,
    "composition": "Levocetirizine 2.5mg/5ml",
    "popular": false
  },
  {
    "name": "Levocet-M Tablet",
    "category": "Allergy & Cold",
    "mrp": 140,
    "composition": "Levocetirizine 5mg + Montelukast 10mg",
    "popular": false
  },
  {
    "name": "Teczine 5mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 72,
    "composition": "Levocetirizine Hydrochloride 5mg",
    "popular": false
  },
  {
    "name": "Teczine Syrup 60ml",
    "category": "Allergy & Cold",
    "mrp": 50,
    "composition": "Levocetirizine 2.5mg/5ml",
    "popular": false
  },
  {
    "name": "Xyzal 5mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 85,
    "composition": "Levocetirizine Dihydrochloride 5mg",
    "popular": false
  },
  {
    "name": "Okacet 10mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 42,
    "composition": "Cetirizine Hydrochloride 10mg",
    "popular": true
  },
  {
    "name": "Cetzine 10mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 45,
    "composition": "Cetirizine Hydrochloride 10mg",
    "popular": true
  },
  {
    "name": "Cetzine Syrup 60ml",
    "category": "Allergy & Cold",
    "mrp": 38,
    "composition": "Cetirizine 5mg/5ml",
    "popular": false
  },
  {
    "name": "Alerid 10mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 40,
    "composition": "Cetirizine Hydrochloride 10mg",
    "popular": false
  },
  {
    "name": "Alerid Syrup 60ml",
    "category": "Allergy & Cold",
    "mrp": 35,
    "composition": "Cetirizine 5mg/5ml",
    "popular": false
  },
  {
    "name": "Incid-L 5mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 55,
    "composition": "Levocetirizine 5mg",
    "popular": false
  },
  {
    "name": "Avomine 25mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 52,
    "composition": "Promethazine Theoclate 25mg",
    "popular": true
  },
  {
    "name": "Phenergan 10mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 32,
    "composition": "Promethazine Hydrochloride 10mg",
    "popular": false
  },
  {
    "name": "Phenergan 25mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 48,
    "composition": "Promethazine Hydrochloride 25mg",
    "popular": false
  },
  {
    "name": "Cheston Cold Tablet",
    "category": "Allergy & Cold",
    "mrp": 52,
    "composition": "Cetirizine 5mg + Paracetamol 325mg + Phenylephrine 10mg",
    "popular": true
  },
  {
    "name": "Sinarest Tablet",
    "category": "Allergy & Cold",
    "mrp": 65,
    "composition": "Paracetamol 500mg + Chlorpheniramine 2mg + Phenylephrine 10mg",
    "popular": true
  },
  {
    "name": "Sinarest-LP Tablet",
    "category": "Allergy & Cold",
    "mrp": 70,
    "composition": "Paracetamol + Levocetirizine + Phenylephrine",
    "popular": false
  },
  {
    "name": "Sinarest Syrup 60ml",
    "category": "Allergy & Cold",
    "mrp": 55,
    "composition": "Paracetamol + Chlorpheniramine + Phenylephrine",
    "popular": false
  },
  {
    "name": "D-Cold Total Tablet",
    "category": "Allergy & Cold",
    "mrp": 58,
    "composition": "Paracetamol 500mg + Phenylephrine 5mg + Caffeine 30mg",
    "popular": true
  },
  {
    "name": "Solvin Cold Tablet",
    "category": "Allergy & Cold",
    "mrp": 64,
    "composition": "Paracetamol + Chlorpheniramine + Phenylephrine",
    "popular": false
  },
  {
    "name": "Wikoryl Tablet",
    "category": "Allergy & Cold",
    "mrp": 60,
    "composition": "Paracetamol + Phenylephrine + Chlorpheniramine",
    "popular": false
  },
  {
    "name": "Febrex Plus Tablet",
    "category": "Allergy & Cold",
    "mrp": 58,
    "composition": "Paracetamol + Phenylephrine + Chlorpheniramine",
    "popular": false
  },
  {
    "name": "Maxtra Syrup 60ml",
    "category": "Allergy & Cold",
    "mrp": 72,
    "composition": "Phenylephrine + Chlorpheniramine Pead Syrup",
    "popular": false
  },
  {
    "name": "Nasivion Adult Drops 10ml",
    "category": "Allergy & Cold",
    "mrp": 98,
    "composition": "Oxymetazoline Hydrochloride 0.05%",
    "popular": true
  },
  {
    "name": "Nasivion Mini Drops 10ml",
    "category": "Allergy & Cold",
    "mrp": 85,
    "composition": "Oxymetazoline 0.01% Infant Drops",
    "popular": false
  },
  {
    "name": "Nasivion Kids Drops 10ml",
    "category": "Allergy & Cold",
    "mrp": 90,
    "composition": "Oxymetazoline 0.025% Pediatric Drops",
    "popular": false
  },
  {
    "name": "Otrivin Oxy Fast Relief 10ml",
    "category": "Allergy & Cold",
    "mrp": 110,
    "composition": "Oxymetazoline HCl 0.05% Spray",
    "popular": true
  },
  {
    "name": "Otrivin Moisturizing 10ml",
    "category": "Allergy & Cold",
    "mrp": 115,
    "composition": "Xylometazoline + Sorbitol Nasal Spray",
    "popular": false
  },
  {
    "name": "Flomist Nasal Spray 120md",
    "category": "Allergy & Cold",
    "mrp": 380,
    "composition": "Fluticasone Propionate 50mcg",
    "popular": true
  },
  {
    "name": "Metospray Nasal Spray 100md",
    "category": "Allergy & Cold",
    "mrp": 360,
    "composition": "Mometasone Furoate 50mcg",
    "popular": false
  },
  {
    "name": "Ascoril-LS Syrup 100ml",
    "category": "Allergy & Cold",
    "mrp": 130,
    "composition": "Levosalbutamol 1mg + Ambroxol 30mg + Guaifenesin 50mg",
    "popular": true
  },
  {
    "name": "Ascoril-D Plus Syrup 100ml",
    "category": "Allergy & Cold",
    "mrp": 135,
    "composition": "Dextromethorphan + Phenylephrine + Chlorpheniramine",
    "popular": false
  },
  {
    "name": "Ascoril Flu Syrup 100ml",
    "category": "Allergy & Cold",
    "mrp": 125,
    "composition": "Phenylephrine + Chlorpheniramine + Paracetamol",
    "popular": false
  },
  {
    "name": "Alex Cough Syrup 100ml",
    "category": "Allergy & Cold",
    "mrp": 138,
    "composition": "Dextromethorphan 10mg + Chlorpheniramine 2mg",
    "popular": true
  },
  {
    "name": "Alex Sugar Free 100ml",
    "category": "Allergy & Cold",
    "mrp": 142,
    "composition": "Dextromethorphan + Chlorpheniramine (Sugar Free)",
    "popular": false
  },
  {
    "name": "Benadryl Cough Syrup 100ml",
    "category": "Allergy & Cold",
    "mrp": 140,
    "composition": "Diphenhydramine 14.08mg + Ammonium Chloride 138mg",
    "popular": true
  },
  {
    "name": "Benadryl DR Syrup 100ml",
    "category": "Allergy & Cold",
    "mrp": 135,
    "composition": "Dextromethorphan 15mg Dry Cough Syrup",
    "popular": false
  },
  {
    "name": "Grilinctus Syrup 100ml",
    "category": "Allergy & Cold",
    "mrp": 132,
    "composition": "Dextromethorphan + Ammonium Chloride + Chlorpheniramine",
    "popular": true
  },
  {
    "name": "Grilinctus-BM Syrup 100ml",
    "category": "Allergy & Cold",
    "mrp": 110,
    "composition": "Terbutaline 1.25mg + Bromhexine 4mg",
    "popular": false
  },
  {
    "name": "Chericof Syrup 100ml",
    "category": "Allergy & Cold",
    "mrp": 125,
    "composition": "Dextromethorphan + Phenylephrine + Chlorpheniramine",
    "popular": false
  },
  {
    "name": "Zedex Cough Syrup 100ml",
    "category": "Allergy & Cold",
    "mrp": 130,
    "composition": "Bromhexine + Dextromethorphan",
    "popular": false
  },
  {
    "name": "Honitus Herbal Syrup 100ml",
    "category": "Allergy & Cold",
    "mrp": 115,
    "composition": "Dabur Ayurvedic Honey Herbal Formula",
    "popular": true
  },
  {
    "name": "Koflet Syrup 100ml",
    "category": "Allergy & Cold",
    "mrp": 110,
    "composition": "Himalaya Herbal Ayurvedic Cough Syrup",
    "popular": false
  },
  {
    "name": "Asthalin 100mcg Inhaler 200md",
    "category": "Allergy & Cold",
    "mrp": 160,
    "composition": "Salbutamol (Albuterol) 100mcg Inhaler",
    "popular": true
  },
  {
    "name": "Asthalin 4mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 10,
    "composition": "Salbutamol 4mg",
    "popular": false
  },
  {
    "name": "Asthalin 2mg Tablet",
    "category": "Allergy & Cold",
    "mrp": 8,
    "composition": "Salbutamol 2mg",
    "popular": false
  },
  {
    "name": "Asthalin Respules 2.5ml",
    "category": "Allergy & Cold",
    "mrp": 35,
    "composition": "Salbutamol Respirator Solution 2.5mg",
    "popular": false
  },
  {
    "name": "Seroflo 125 Inhaler 120md",
    "category": "Allergy & Cold",
    "mrp": 480,
    "composition": "Salmeterol 25mcg + Fluticasone 125mcg",
    "popular": true
  },
  {
    "name": "Seroflo 250 Inhaler 120md",
    "category": "Allergy & Cold",
    "mrp": 680,
    "composition": "Salmeterol 25mcg + Fluticasone 250mcg",
    "popular": true
  },
  {
    "name": "Seroflo 100 Rotacaps 30s",
    "category": "Allergy & Cold",
    "mrp": 240,
    "composition": "Salmeterol 50mcg + Fluticasone 100mcg",
    "popular": false
  },
  {
    "name": "Seroflo 250 Rotacaps 30s",
    "category": "Allergy & Cold",
    "mrp": 340,
    "composition": "Salmeterol 50mcg + Fluticasone 250mcg",
    "popular": false
  },
  {
    "name": "Foracort 200 Synchrobreathe",
    "category": "Allergy & Cold",
    "mrp": 490,
    "composition": "Budesonide 200mcg + Formoterol 6mcg",
    "popular": true
  },
  {
    "name": "Foracort 400 Inhaler 120md",
    "category": "Allergy & Cold",
    "mrp": 620,
    "composition": "Budesonide 400mcg + Formoterol 6mcg",
    "popular": false
  },
  {
    "name": "Foracort 100 Inhaler 120md",
    "category": "Allergy & Cold",
    "mrp": 390,
    "composition": "Budesonide 100mcg + Formoterol 6mcg",
    "popular": false
  },
  {
    "name": "Foracort 200 Rotacaps 30s",
    "category": "Allergy & Cold",
    "mrp": 260,
    "composition": "Budesonide 200mcg + Formoterol 6mcg",
    "popular": false
  },
  {
    "name": "Foracort 400 Rotacaps 30s",
    "category": "Allergy & Cold",
    "mrp": 340,
    "composition": "Budesonide 400mcg + Formoterol 6mcg",
    "popular": false
  },
  {
    "name": "Budecort 200 Inhaler 200md",
    "category": "Allergy & Cold",
    "mrp": 340,
    "composition": "Budesonide 200mcg Inhaler",
    "popular": true
  },
  {
    "name": "Budecort 100 Inhaler 200md",
    "category": "Allergy & Cold",
    "mrp": 260,
    "composition": "Budesonide 100mcg Inhaler",
    "popular": false
  },
  {
    "name": "Budecort 0.5mg Respules 5s",
    "category": "Allergy & Cold",
    "mrp": 135,
    "composition": "Budesonide 0.5mg/2ml Respules",
    "popular": false
  },
  {
    "name": "Budecort 1mg Respules 5s",
    "category": "Allergy & Cold",
    "mrp": 180,
    "composition": "Budesonide 1mg/2ml Respules",
    "popular": false
  },
  {
    "name": "Duolin Inhaler 200md",
    "category": "Allergy & Cold",
    "mrp": 380,
    "composition": "Levosalbutamol 50mcg + Ipratropium 20mcg",
    "popular": true
  },
  {
    "name": "Duolin Respules 2.5ml",
    "category": "Allergy & Cold",
    "mrp": 48,
    "composition": "Levosalbutamol 1.25mg + Ipratropium 500mcg",
    "popular": false
  },
  {
    "name": "Tiova Inhaler 120md",
    "category": "Allergy & Cold",
    "mrp": 690,
    "composition": "Tiotropium Bromide 9mcg",
    "popular": false
  },
  {
    "name": "Tiova Rotacaps 30s",
    "category": "Allergy & Cold",
    "mrp": 390,
    "composition": "Tiotropium Bromide 18mcg",
    "popular": false
  },
  {
    "name": "Deriphyllin Retard 150",
    "category": "Allergy & Cold",
    "mrp": 42,
    "composition": "Theophylline 115mg + Etofylline 35mg",
    "popular": false
  },
  {
    "name": "Deriphyllin Retard 300",
    "category": "Allergy & Cold",
    "mrp": 68,
    "composition": "Theophylline 231mg + Etofylline 69mg",
    "popular": false
  },
  {
    "name": "Deriphyllin Injection 2ml",
    "category": "Allergy & Cold",
    "mrp": 12,
    "composition": "Theophylline + Etofylline Injection",
    "popular": false
  },
  {
    "name": "Mucinac 600 Effervescent",
    "category": "Allergy & Cold",
    "mrp": 280,
    "composition": "Acetylcysteine 600mg Effervescent",
    "popular": true
  },
  {
    "name": "Shelcal 500 Tablet",
    "category": "Supplements",
    "mrp": 132,
    "composition": "Elemental Calcium 500mg + Vitamin D3 250 IU",
    "popular": true
  },
  {
    "name": "Shelcal-HD Tablet",
    "category": "Supplements",
    "mrp": 160,
    "composition": "Elemental Calcium 500mg + Vitamin D3 500 IU",
    "popular": true
  },
  {
    "name": "Shelcal-XT Tablet",
    "category": "Supplements",
    "mrp": 280,
    "composition": "Calcium + Vitamin D3 + Methylcobalamin + L-Methylfolate",
    "popular": false
  },
  {
    "name": "Shelcal 250 Tablet",
    "category": "Supplements",
    "mrp": 85,
    "composition": "Calcium 250mg + Vitamin D3 125 IU",
    "popular": false
  },
  {
    "name": "Shelcal Syrup 200ml",
    "category": "Supplements",
    "mrp": 145,
    "composition": "Calcium Carbonate + Vitamin D3 Suspension",
    "popular": false
  },
  {
    "name": "Cipcal 500 Tablet",
    "category": "Supplements",
    "mrp": 115,
    "composition": "Calcium 500mg + Vitamin D3 250 IU",
    "popular": true
  },
  {
    "name": "Cipcal-D Tablet",
    "category": "Supplements",
    "mrp": 135,
    "composition": "Calcium Carbonate + Vitamin D3",
    "popular": false
  },
  {
    "name": "Gemcal Capsule",
    "category": "Supplements",
    "mrp": 295,
    "composition": "Calcium Carbonate + Calcitriol + Zinc",
    "popular": false
  },
  {
    "name": "Gemcal-D3 Capsule",
    "category": "Supplements",
    "mrp": 310,
    "composition": "Calcium + Calcitriol + Vitamin K2-7",
    "popular": false
  },
  {
    "name": "Coralium-D3 Tablet",
    "category": "Supplements",
    "mrp": 340,
    "composition": "Coral Calcium 500mg + Vitamin D3 400 IU",
    "popular": false
  },
  {
    "name": "Calcimax 500 Tablet",
    "category": "Supplements",
    "mrp": 190,
    "composition": "Calcium + Magnesium + Zinc + Vitamin D3",
    "popular": false
  },
  {
    "name": "Calcimax Plus Tablet",
    "category": "Supplements",
    "mrp": 240,
    "composition": "Calcium + Vitamin D3 + Boron + Trace Minerals",
    "popular": false
  },
  {
    "name": "Supradyn Daily Tablet 15s",
    "category": "Supplements",
    "mrp": 60,
    "composition": "Multivitamins + Minerals + Trace Elements",
    "popular": true
  },
  {
    "name": "Becosules Capsule 20s",
    "category": "Supplements",
    "mrp": 55,
    "composition": "Vitamin B Complex + Vitamin C",
    "popular": true
  },
  {
    "name": "Becosules-Z Capsule 20s",
    "category": "Supplements",
    "mrp": 65,
    "composition": "Vitamin B Complex + Vitamin C + Zinc",
    "popular": true
  },
  {
    "name": "Cobadex Forte Capsule",
    "category": "Supplements",
    "mrp": 48,
    "composition": "Vitamin B Complex + Vitamin C + Folic Acid",
    "popular": false
  },
  {
    "name": "Cobadex CZS Tablet",
    "category": "Supplements",
    "mrp": 85,
    "composition": "Vitamin B Complex + Vitamin C + Zinc + Chromium",
    "popular": false
  },
  {
    "name": "Neurobion Forte Tablet 30s",
    "category": "Supplements",
    "mrp": 42,
    "composition": "Vitamin B1, B6, B12 Complex",
    "popular": true
  },
  {
    "name": "Neurobion Plus Tablet 10s",
    "category": "Supplements",
    "mrp": 135,
    "composition": "Mecobalamin 750mcg + Pyridoxine 3mg + Nicotinamide 45mg",
    "popular": true
  },
  {
    "name": "Neurobion Forte Injection 2ml",
    "category": "Supplements",
    "mrp": 18,
    "composition": "Vitamin B1 + B6 + B12 Injection",
    "popular": false
  },
  {
    "name": "Mecofol-Plus NF Capsule",
    "category": "Supplements",
    "mrp": 185,
    "composition": "Methylcobalamin + Alpha Lipoic Acid + Benfotiamine",
    "popular": false
  },
  {
    "name": "Rejunex CD3 Tablet",
    "category": "Supplements",
    "mrp": 260,
    "composition": "Methylcobalamin + Alpha Lipoic Acid + Vitamin D3",
    "popular": false
  },
  {
    "name": "Rejunuron Plus Capsule",
    "category": "Supplements",
    "mrp": 195,
    "composition": "Mecobalamin + Folic Acid + Nicotinamide",
    "popular": false
  },
  {
    "name": "Nervijen-D Capsule",
    "category": "Supplements",
    "mrp": 220,
    "composition": "Methylcobalamin + Vitamin D3 + Folic Acid",
    "popular": false
  },
  {
    "name": "Evion 400mg Capsule 10s",
    "category": "Supplements",
    "mrp": 40,
    "composition": "Vitamin E (Tocopheryl Acetate 400mg)",
    "popular": true
  },
  {
    "name": "Evion 200mg Capsule 10s",
    "category": "Supplements",
    "mrp": 25,
    "composition": "Vitamin E 200mg",
    "popular": false
  },
  {
    "name": "Evion 600mg Capsule 10s",
    "category": "Supplements",
    "mrp": 55,
    "composition": "Vitamin E 600mg",
    "popular": false
  },
  {
    "name": "Evion LC Tablet 10s",
    "category": "Supplements",
    "mrp": 68,
    "composition": "Vitamin E 200mg + Levocarnitine 150mg",
    "popular": false
  },
  {
    "name": "Limcee 500mg Chewable 15s",
    "category": "Supplements",
    "mrp": 28,
    "composition": "Vitamin C 500mg Orange Flavor",
    "popular": true
  },
  {
    "name": "Celin 500 Tablet 25s",
    "category": "Supplements",
    "mrp": 42,
    "composition": "Vitamin C (Ascorbic Acid 500mg)",
    "popular": true
  },
  {
    "name": "Chewcee 500 Tablet",
    "category": "Supplements",
    "mrp": 35,
    "composition": "Vitamin C 500mg Chewable",
    "popular": false
  },
  {
    "name": "Zincovit Tablet 15s",
    "category": "Supplements",
    "mrp": 110,
    "composition": "Multivitamin + Multimineral with Zinc & Grape Seed",
    "popular": true
  },
  {
    "name": "Zincovit Syrup 200ml",
    "category": "Supplements",
    "mrp": 145,
    "composition": "Multivitamin + Minerals Tonic",
    "popular": false
  },
  {
    "name": "Zincovit Drops 15ml",
    "category": "Supplements",
    "mrp": 65,
    "composition": "Pediatric Multivitamin Drops",
    "popular": false
  },
  {
    "name": "Zinconia 50mg Tablet",
    "category": "Supplements",
    "mrp": 55,
    "composition": "Zinc Acetate 50mg",
    "popular": false
  },
  {
    "name": "Zinconia Syrup 100ml",
    "category": "Supplements",
    "mrp": 65,
    "composition": "Zinc 20mg/5ml Pead Syrup",
    "popular": false
  },
  {
    "name": "A-Z Multivitamin Tablet",
    "category": "Supplements",
    "mrp": 145,
    "composition": "Multivitamins with Pine Bark Extract",
    "popular": false
  },
  {
    "name": "Uprise-D3 60K Capsule",
    "category": "Supplements",
    "mrp": 280,
    "composition": "Cholecalciferol 60,000 IU (Vitamin D3)",
    "popular": true
  },
  {
    "name": "Uprise-D3 Syrup 5ml",
    "category": "Supplements",
    "mrp": 85,
    "composition": "Cholecalciferol 60,000 IU/5ml",
    "popular": false
  },
  {
    "name": "Tayo 60K Capsule",
    "category": "Supplements",
    "mrp": 260,
    "composition": "Cholecalciferol 60,000 IU",
    "popular": true
  },
  {
    "name": "D-Rise 60K Capsule",
    "category": "Supplements",
    "mrp": 275,
    "composition": "Cholecalciferol 60,000 IU",
    "popular": false
  },
  {
    "name": "Calcirol Sachet 1g",
    "category": "Supplements",
    "mrp": 52,
    "composition": "Cholecalciferol 60,000 IU Granules",
    "popular": true
  },
  {
    "name": "Arachitol 6L Injection 1ml",
    "category": "Supplements",
    "mrp": 380,
    "composition": "Vitamin D3 6,00,000 IU Depot Injection",
    "popular": false
  },
  {
    "name": "Folvite 5mg Tablet 45s",
    "category": "Supplements",
    "mrp": 85,
    "composition": "Folic Acid 5mg (Vitamin B9)",
    "popular": true
  },
  {
    "name": "Fol 5mg Tablet",
    "category": "Supplements",
    "mrp": 45,
    "composition": "Folic Acid 5mg",
    "popular": false
  },
  {
    "name": "Autrin Capsule 30s",
    "category": "Supplements",
    "mrp": 160,
    "composition": "Ferrous Fumarate + Folic Acid + Vitamin B12",
    "popular": true
  },
  {
    "name": "Orofer-XT Tablet 10s",
    "category": "Supplements",
    "mrp": 230,
    "composition": "Ferrous Ascorbate 100mg + Folic Acid 1.5mg",
    "popular": true
  },
  {
    "name": "Orofer-XT Syrup 150ml",
    "category": "Supplements",
    "mrp": 195,
    "composition": "Ferrous Ascorbate + Folic Acid Tonic",
    "popular": false
  },
  {
    "name": "Livogen-Z Captab 15s",
    "category": "Supplements",
    "mrp": 95,
    "composition": "Ferrous Fumarate 152mg + Folic Acid 750mcg + Zinc",
    "popular": true
  },
  {
    "name": "Livogen Adult Tonic 200ml",
    "category": "Supplements",
    "mrp": 140,
    "composition": "Iron + Vitamin B12 + Folic Acid",
    "popular": false
  },
  {
    "name": "Fefol-Z Capsule 30s",
    "category": "Supplements",
    "mrp": 145,
    "composition": "Iron + Folic Acid + Zinc Spansules",
    "popular": false
  },
  {
    "name": "Dexorange Syrup 200ml",
    "category": "Supplements",
    "mrp": 165,
    "composition": "Ferric Ammonium Citrate + Folic Acid + B12",
    "popular": true
  },
  {
    "name": "Dexorange Capsule 30s",
    "category": "Supplements",
    "mrp": 175,
    "composition": "Iron + Folic Acid + Vitamin B12",
    "popular": false
  },
  {
    "name": "Cheri Syrup 200ml",
    "category": "Supplements",
    "mrp": 155,
    "composition": "Iron + Folic Acid + Vitamin B12 Tonic",
    "popular": false
  },
  {
    "name": "CoQ 300mg Capsule",
    "category": "Supplements",
    "mrp": 1250,
    "composition": "Coenzyme Q10 300mg",
    "popular": false
  },
  {
    "name": "CoQ 100mg Capsule",
    "category": "Supplements",
    "mrp": 580,
    "composition": "Coenzyme Q10 100mg",
    "popular": false
  },
  {
    "name": "Seacod Cod Liver Oil 100s",
    "category": "Supplements",
    "mrp": 340,
    "composition": "Pure Cod Liver Oil with Omega-3 & Vitamin A, D",
    "popular": false
  },
  {
    "name": "Maxirich Multivitamin 10s",
    "category": "Supplements",
    "mrp": 110,
    "composition": "Multivitamin + Ginseng Extract",
    "popular": false
  },
  {
    "name": "Revital H Capsule 30s",
    "category": "Supplements",
    "mrp": 310,
    "composition": "Daily Health Supplement with Ginseng & Zinc",
    "popular": true
  },
  {
    "name": "Revital H Woman 30s",
    "category": "Supplements",
    "mrp": 345,
    "composition": "Daily Health Supplement for Women with Iron & Calcium",
    "popular": false
  },
  {
    "name": "Thyronorm 25mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 150,
    "composition": "Thyroxine Sodium 25mcg",
    "popular": true
  },
  {
    "name": "Thyronorm 50mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 170,
    "composition": "Thyroxine Sodium 50mcg",
    "popular": true
  },
  {
    "name": "Thyronorm 75mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 180,
    "composition": "Thyroxine Sodium 75mcg",
    "popular": true
  },
  {
    "name": "Thyronorm 88mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 190,
    "composition": "Thyroxine Sodium 88mcg",
    "popular": false
  },
  {
    "name": "Thyronorm 100mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 205,
    "composition": "Thyroxine Sodium 100mcg",
    "popular": true
  },
  {
    "name": "Thyronorm 112mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 210,
    "composition": "Thyroxine Sodium 112mcg",
    "popular": false
  },
  {
    "name": "Thyronorm 125mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 215,
    "composition": "Thyroxine Sodium 125mcg",
    "popular": true
  },
  {
    "name": "Thyronorm 137mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 220,
    "composition": "Thyroxine Sodium 137mcg",
    "popular": false
  },
  {
    "name": "Thyronorm 150mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 230,
    "composition": "Thyroxine Sodium 150mcg",
    "popular": false
  },
  {
    "name": "Eltroxin 25mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 140,
    "composition": "Thyroxine Sodium 25mcg",
    "popular": false
  },
  {
    "name": "Eltroxin 50mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 155,
    "composition": "Thyroxine Sodium 50mcg",
    "popular": true
  },
  {
    "name": "Eltroxin 75mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 175,
    "composition": "Thyroxine Sodium 75mcg",
    "popular": false
  },
  {
    "name": "Eltroxin 88mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 185,
    "composition": "Thyroxine Sodium 88mcg",
    "popular": false
  },
  {
    "name": "Eltroxin 100mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 195,
    "composition": "Thyroxine Sodium 100mcg",
    "popular": true
  },
  {
    "name": "Eltroxin 125mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 205,
    "composition": "Thyroxine Sodium 125mcg",
    "popular": false
  },
  {
    "name": "Thyrox 25mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 135,
    "composition": "Levothyroxine Sodium 25mcg",
    "popular": false
  },
  {
    "name": "Thyrox 50mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 150,
    "composition": "Levothyroxine Sodium 50mcg",
    "popular": false
  },
  {
    "name": "Thyrox 100mcg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 185,
    "composition": "Levothyroxine Sodium 100mcg",
    "popular": false
  },
  {
    "name": "Duphaston 10mg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 790,
    "composition": "Dydrogesterone 10mg",
    "popular": true
  },
  {
    "name": "Susten 100mg Capsule",
    "category": "Thyroid & Hormones",
    "mrp": 240,
    "composition": "Natural Micronised Progesterone 100mg",
    "popular": false
  },
  {
    "name": "Susten 200mg Capsule",
    "category": "Thyroid & Hormones",
    "mrp": 450,
    "composition": "Natural Micronised Progesterone 200mg",
    "popular": true
  },
  {
    "name": "Susten 300mg Capsule",
    "category": "Thyroid & Hormones",
    "mrp": 620,
    "composition": "Natural Micronised Progesterone 300mg",
    "popular": false
  },
  {
    "name": "Susten 400mg Capsule",
    "category": "Thyroid & Hormones",
    "mrp": 780,
    "composition": "Natural Micronised Progesterone 400mg",
    "popular": false
  },
  {
    "name": "Susten SR 200 Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 380,
    "composition": "Progesterone 200mg Sustained Release",
    "popular": false
  },
  {
    "name": "Naturogest 200mg Capsule",
    "category": "Thyroid & Hormones",
    "mrp": 420,
    "composition": "Natural Micronised Progesterone 200mg",
    "popular": false
  },
  {
    "name": "Naturogest 100mg Capsule",
    "category": "Thyroid & Hormones",
    "mrp": 230,
    "composition": "Natural Micronised Progesterone 100mg",
    "popular": false
  },
  {
    "name": "Primolut-N 5mg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 75,
    "composition": "Norethisterone 5mg",
    "popular": true
  },
  {
    "name": "Regestrone 5mg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 70,
    "composition": "Norethisterone 5mg",
    "popular": true
  },
  {
    "name": "Regestrone CR 10mg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 150,
    "composition": "Norethisterone Controlled Release 10mg",
    "popular": false
  },
  {
    "name": "Deviry 10mg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 78,
    "composition": "Medroxyprogesterone Acetate 10mg",
    "popular": false
  },
  {
    "name": "Trapic 500mg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 165,
    "composition": "Tranexamic Acid 500mg",
    "popular": true
  },
  {
    "name": "Trapic-MF Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 245,
    "composition": "Tranexamic Acid 500mg + Mefenamic Acid 250mg",
    "popular": true
  },
  {
    "name": "Pause 500mg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 155,
    "composition": "Tranexamic Acid 500mg",
    "popular": false
  },
  {
    "name": "Pause-MF Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 235,
    "composition": "Tranexamic Acid 500mg + Mefenamic Acid 250mg",
    "popular": false
  },
  {
    "name": "Unwanted-72 Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 110,
    "composition": "Levonorgestrel 1.5mg Emergency Pill",
    "popular": true
  },
  {
    "name": "i-Pill Emergency Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 110,
    "composition": "Levonorgestrel 1.5mg Emergency Contraceptive",
    "popular": true
  },
  {
    "name": "Mala-D Tablet 28s",
    "category": "Thyroid & Hormones",
    "mrp": 10,
    "composition": "Levonorgestrel + Ethinylestradiol",
    "popular": false
  },
  {
    "name": "Ovral-G Tablet 20s",
    "category": "Thyroid & Hormones",
    "mrp": 295,
    "composition": "Norgestrel + Ethinylestradiol",
    "popular": false
  },
  {
    "name": "Saheli Non-Steroidal Pill",
    "category": "Thyroid & Hormones",
    "mrp": 35,
    "composition": "Ormeloxifene (Centchroman 30mg)",
    "popular": false
  },
  {
    "name": "Cabergoline 0.5mg Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 240,
    "composition": "Cabergoline 0.5mg",
    "popular": false
  },
  {
    "name": "Caberlin 0.5 Tablet",
    "category": "Thyroid & Hormones",
    "mrp": 260,
    "composition": "Cabergoline 0.5mg",
    "popular": false
  },
  {
    "name": "Nexito 10 Tablet",
    "category": "Neurology",
    "mrp": 115,
    "composition": "Escitalopram Oxalate 10mg",
    "popular": true
  },
  {
    "name": "Nexito 5 Tablet",
    "category": "Neurology",
    "mrp": 68,
    "composition": "Escitalopram Oxalate 5mg",
    "popular": false
  },
  {
    "name": "Nexito 20 Tablet",
    "category": "Neurology",
    "mrp": 195,
    "composition": "Escitalopram Oxalate 20mg",
    "popular": false
  },
  {
    "name": "Nexito-Plus Tablet",
    "category": "Neurology",
    "mrp": 145,
    "composition": "Escitalopram 10mg + Clonazepam 0.5mg",
    "popular": true
  },
  {
    "name": "Nexito Forte Tablet",
    "category": "Neurology",
    "mrp": 180,
    "composition": "Escitalopram 20mg + Clonazepam 0.5mg",
    "popular": false
  },
  {
    "name": "Stalopam 10 Tablet",
    "category": "Neurology",
    "mrp": 110,
    "composition": "Escitalopram 10mg",
    "popular": false
  },
  {
    "name": "Stalopam-Plus Tablet",
    "category": "Neurology",
    "mrp": 140,
    "composition": "Escitalopram + Clonazepam",
    "popular": false
  },
  {
    "name": "Clonafit 0.5 Tablet",
    "category": "Neurology",
    "mrp": 65,
    "composition": "Clonazepam 0.5mg",
    "popular": true
  },
  {
    "name": "Clonafit 0.25 Tablet",
    "category": "Neurology",
    "mrp": 40,
    "composition": "Clonazepam 0.25mg",
    "popular": false
  },
  {
    "name": "Clonafit 1mg Tablet",
    "category": "Neurology",
    "mrp": 110,
    "composition": "Clonazepam 1mg",
    "popular": false
  },
  {
    "name": "Clonafit-Plus Tablet",
    "category": "Neurology",
    "mrp": 140,
    "composition": "Clonazepam 0.5mg + Escitalopram 10mg",
    "popular": false
  },
  {
    "name": "Epitril 0.5mg Tablet",
    "category": "Neurology",
    "mrp": 68,
    "composition": "Clonazepam 0.5mg",
    "popular": false
  },
  {
    "name": "Epitril 2mg Tablet",
    "category": "Neurology",
    "mrp": 180,
    "composition": "Clonazepam 2mg",
    "popular": false
  },
  {
    "name": "Lonazep 0.5 Tablet",
    "category": "Neurology",
    "mrp": 62,
    "composition": "Clonazepam 0.5mg",
    "popular": false
  },
  {
    "name": "Zapiz 0.5mg Tablet",
    "category": "Neurology",
    "mrp": 58,
    "composition": "Clonazepam 0.5mg Mouth Dissolving",
    "popular": false
  },
  {
    "name": "Alprazolam 0.25mg Tablet",
    "category": "Neurology",
    "mrp": 25,
    "composition": "Alprazolam 0.25mg",
    "popular": true
  },
  {
    "name": "Alprazolam 0.5mg Tablet",
    "category": "Neurology",
    "mrp": 45,
    "composition": "Alprazolam 0.5mg",
    "popular": false
  },
  {
    "name": "Alprax 0.25 Tablet",
    "category": "Neurology",
    "mrp": 32,
    "composition": "Alprazolam 0.25mg",
    "popular": false
  },
  {
    "name": "Alprax 0.5 Tablet",
    "category": "Neurology",
    "mrp": 55,
    "composition": "Alprazolam 0.5mg",
    "popular": false
  },
  {
    "name": "Restyl 0.25 Tablet",
    "category": "Neurology",
    "mrp": 30,
    "composition": "Alprazolam 0.25mg",
    "popular": false
  },
  {
    "name": "Restyl 0.5 Tablet",
    "category": "Neurology",
    "mrp": 52,
    "composition": "Alprazolam 0.5mg",
    "popular": false
  },
  {
    "name": "Trika 0.25 Tablet",
    "category": "Neurology",
    "mrp": 28,
    "composition": "Alprazolam 0.25mg",
    "popular": false
  },
  {
    "name": "Trika 0.5 Tablet",
    "category": "Neurology",
    "mrp": 50,
    "composition": "Alprazolam 0.5mg",
    "popular": false
  },
  {
    "name": "Ativan 1mg Tablet",
    "category": "Neurology",
    "mrp": 42,
    "composition": "Lorazepam 1mg",
    "popular": false
  },
  {
    "name": "Ativan 2mg Tablet",
    "category": "Neurology",
    "mrp": 75,
    "composition": "Lorazepam 2mg",
    "popular": false
  },
  {
    "name": "Nitrest 10mg Tablet",
    "category": "Neurology",
    "mrp": 135,
    "composition": "Zolpidem Tartrate 10mg",
    "popular": false
  },
  {
    "name": "Nitrest 5mg Tablet",
    "category": "Neurology",
    "mrp": 75,
    "composition": "Zolpidem Tartrate 5mg",
    "popular": false
  },
  {
    "name": "Zolcalm 10 Tablet",
    "category": "Neurology",
    "mrp": 130,
    "composition": "Zolpidem 10mg",
    "popular": false
  },
  {
    "name": "Gabapin 300mg Capsule",
    "category": "Neurology",
    "mrp": 185,
    "composition": "Gabapentin 300mg",
    "popular": false
  },
  {
    "name": "Gabapin 100mg Tablet",
    "category": "Neurology",
    "mrp": 85,
    "composition": "Gabapentin 100mg",
    "popular": false
  },
  {
    "name": "Gabapin-NT 100 Tablet",
    "category": "Neurology",
    "mrp": 290,
    "composition": "Gabapentin 100mg + Nortriptyline 10mg",
    "popular": true
  },
  {
    "name": "Gabapin-NT 400 Tablet",
    "category": "Neurology",
    "mrp": 460,
    "composition": "Gabapentin 400mg + Nortriptyline 10mg",
    "popular": false
  },
  {
    "name": "Pregabalin 75mg Capsule",
    "category": "Neurology",
    "mrp": 145,
    "composition": "Pregabalin 75mg",
    "popular": true
  },
  {
    "name": "Pregabalin 150mg Capsule",
    "category": "Neurology",
    "mrp": 260,
    "composition": "Pregabalin 150mg",
    "popular": false
  },
  {
    "name": "Pregalin-M 75 Capsule",
    "category": "Neurology",
    "mrp": 235,
    "composition": "Pregabalin 75mg + Methylcobalamin 750mcg",
    "popular": true
  },
  {
    "name": "Pregalin-NT Tablet",
    "category": "Neurology",
    "mrp": 280,
    "composition": "Pregabalin 75mg + Nortriptyline 10mg",
    "popular": false
  },
  {
    "name": "Maxgalin 75 Capsule",
    "category": "Neurology",
    "mrp": 220,
    "composition": "Pregabalin 75mg",
    "popular": false
  },
  {
    "name": "Lyrica 75mg Capsule",
    "category": "Neurology",
    "mrp": 890,
    "composition": "Pregabalin 75mg (Pfizer)",
    "popular": false
  },
  {
    "name": "Vertin 16 Tablet",
    "category": "Neurology",
    "mrp": 280,
    "composition": "Betahistine Dihydrochloride 16mg",
    "popular": true
  },
  {
    "name": "Vertin 8 Tablet",
    "category": "Neurology",
    "mrp": 160,
    "composition": "Betahistine Dihydrochloride 8mg",
    "popular": false
  },
  {
    "name": "Vertin 24 Tablet",
    "category": "Neurology",
    "mrp": 390,
    "composition": "Betahistine Dihydrochloride 24mg",
    "popular": false
  },
  {
    "name": "Vertin-OD 48mg Tablet",
    "category": "Neurology",
    "mrp": 540,
    "composition": "Betahistine Dihydrochloride 48mg OD",
    "popular": false
  },
  {
    "name": "Stugeron 25 Tablet",
    "category": "Neurology",
    "mrp": 195,
    "composition": "Cinnarizine 25mg",
    "popular": true
  },
  {
    "name": "Stugeron Forte 75 Tablet",
    "category": "Neurology",
    "mrp": 310,
    "composition": "Cinnarizine 75mg",
    "popular": false
  },
  {
    "name": "Stugeron Plus Tablet",
    "category": "Neurology",
    "mrp": 240,
    "composition": "Cinnarizine 20mg + Dimenhydrinate 40mg",
    "popular": false
  },
  {
    "name": "Nootropil 800mg Tablet",
    "category": "Neurology",
    "mrp": 210,
    "composition": "Piracetam 800mg",
    "popular": false
  },
  {
    "name": "Piratam 800 Tablet",
    "category": "Neurology",
    "mrp": 185,
    "composition": "Piracetam 800mg",
    "popular": false
  },
  {
    "name": "Strocit 500mg Tablet",
    "category": "Neurology",
    "mrp": 620,
    "composition": "Citicoline 500mg",
    "popular": true
  },
  {
    "name": "Citistar 500 Tablet",
    "category": "Neurology",
    "mrp": 590,
    "composition": "Citicoline 500mg",
    "popular": false
  },
  {
    "name": "Encorate Chrono 500",
    "category": "Neurology",
    "mrp": 185,
    "composition": "Sodium Valproate 333mg + Valproic Acid 145mg",
    "popular": false
  },
  {
    "name": "Encorate Chrono 300",
    "category": "Neurology",
    "mrp": 125,
    "composition": "Sodium Valproate 200mg + Valproic Acid 87mg",
    "popular": false
  },
  {
    "name": "Levipil 500mg Tablet",
    "category": "Neurology",
    "mrp": 175,
    "composition": "Levetiracetam 500mg",
    "popular": false
  },
  {
    "name": "Levipil 250mg Tablet",
    "category": "Neurology",
    "mrp": 95,
    "composition": "Levetiracetam 250mg",
    "popular": false
  },
  {
    "name": "Levipil 750mg Tablet",
    "category": "Neurology",
    "mrp": 260,
    "composition": "Levetiracetam 750mg",
    "popular": false
  },
  {
    "name": "Tegrital 200mg Tablet",
    "category": "Neurology",
    "mrp": 45,
    "composition": "Carbamazepine 200mg",
    "popular": false
  },
  {
    "name": "Tegrital CR 200 Tablet",
    "category": "Neurology",
    "mrp": 58,
    "composition": "Carbamazepine Controlled Release 200mg",
    "popular": false
  },
  {
    "name": "Eptoin 100mg Tablet",
    "category": "Neurology",
    "mrp": 195,
    "composition": "Phenytoin Sodium 100mg",
    "popular": false
  },
  {
    "name": "Olimelt 5mg Tablet",
    "category": "Neurology",
    "mrp": 85,
    "composition": "Olanzapine 5mg Mouth Dissolving",
    "popular": false
  },
  {
    "name": "Olimelt 10mg Tablet",
    "category": "Neurology",
    "mrp": 155,
    "composition": "Olanzapine 10mg Mouth Dissolving",
    "popular": false
  },
  {
    "name": "Qutan 25mg Tablet",
    "category": "Neurology",
    "mrp": 75,
    "composition": "Quetiapine Fumarate 25mg",
    "popular": false
  },
  {
    "name": "Qutan 50mg Tablet",
    "category": "Neurology",
    "mrp": 135,
    "composition": "Quetiapine Fumarate 50mg",
    "popular": false
  },
  {
    "name": "Qutan 100mg Tablet",
    "category": "Neurology",
    "mrp": 240,
    "composition": "Quetiapine Fumarate 100mg",
    "popular": false
  },
  {
    "name": "Sertima 50mg Tablet",
    "category": "Neurology",
    "mrp": 140,
    "composition": "Sertraline Hydrochloride 50mg",
    "popular": false
  },
  {
    "name": "Flunil 20mg Capsule",
    "category": "Neurology",
    "mrp": 65,
    "composition": "Fluoxetine Hydrochloride 20mg",
    "popular": false
  },
  {
    "name": "Betadine 10% Ointment 20g",
    "category": "Skin Care & Topicals",
    "mrp": 135,
    "composition": "Povidone Iodine 10% w/w",
    "popular": true
  },
  {
    "name": "Betadine 5% Ointment 20g",
    "category": "Skin Care & Topicals",
    "mrp": 85,
    "composition": "Povidone Iodine 5% w/w",
    "popular": false
  },
  {
    "name": "Betadine 10% Solution 100ml",
    "category": "Skin Care & Topicals",
    "mrp": 145,
    "composition": "Povidone Iodine 10% w/v Antiseptic",
    "popular": false
  },
  {
    "name": "Betadine Gargle 2% 100ml",
    "category": "Skin Care & Topicals",
    "mrp": 195,
    "composition": "Povidone Iodine 2% w/v Germicide Gargle",
    "popular": true
  },
  {
    "name": "Betadine Scrub 7.5% 100ml",
    "category": "Skin Care & Topicals",
    "mrp": 165,
    "composition": "Povidone Iodine Surgical Scrub",
    "popular": false
  },
  {
    "name": "Soframycin Skin Cream 30g",
    "category": "Skin Care & Topicals",
    "mrp": 65,
    "composition": "Framycetin Sulphate 1% w/w",
    "popular": true
  },
  {
    "name": "Soframycin Skin Cream 100g",
    "category": "Skin Care & Topicals",
    "mrp": 185,
    "composition": "Framycetin Sulphate 1% w/w",
    "popular": false
  },
  {
    "name": "T-Bact 2% Ointment 15g",
    "category": "Skin Care & Topicals",
    "mrp": 165,
    "composition": "Mupirocin 2% w/w",
    "popular": true
  },
  {
    "name": "T-Bact 2% Ointment 5g",
    "category": "Skin Care & Topicals",
    "mrp": 82,
    "composition": "Mupirocin 2% w/w",
    "popular": false
  },
  {
    "name": "Bactroban 2% Ointment 5g",
    "category": "Skin Care & Topicals",
    "mrp": 145,
    "composition": "Mupirocin 2% w/w (GSK)",
    "popular": false
  },
  {
    "name": "Neosporin Skin Ointment 20g",
    "category": "Skin Care & Topicals",
    "mrp": 110,
    "composition": "Neomycin + Polymyxin B + Bacitracin",
    "popular": true
  },
  {
    "name": "Neosporin Eye Ointment 5g",
    "category": "Skin Care & Topicals",
    "mrp": 65,
    "composition": "Neomycin + Polymyxin B Ophthalmic",
    "popular": false
  },
  {
    "name": "Neosporin H Ointment 5g",
    "category": "Skin Care & Topicals",
    "mrp": 85,
    "composition": "Neomycin + Hydrocortisone",
    "popular": false
  },
  {
    "name": "Burnol Antiseptic Cream 20g",
    "category": "Skin Care & Topicals",
    "mrp": 75,
    "composition": "Aminacrine HCl + Cetrimide Burn Cream",
    "popular": false
  },
  {
    "name": "Silverex Ionic Gel 20g",
    "category": "Skin Care & Topicals",
    "mrp": 140,
    "composition": "Silver Nitrate + Chlorhexidine Gluconate",
    "popular": false
  },
  {
    "name": "Silvirin Cream 20g",
    "category": "Skin Care & Topicals",
    "mrp": 85,
    "composition": "Silver Sulfadiazine 1% w/w",
    "popular": false
  },
  {
    "name": "Candid-B Cream 20g",
    "category": "Skin Care & Topicals",
    "mrp": 145,
    "composition": "Clotrimazole 1% + Beclomethasone 0.025%",
    "popular": true
  },
  {
    "name": "Candid-B Cream 10g",
    "category": "Skin Care & Topicals",
    "mrp": 85,
    "composition": "Clotrimazole + Beclomethasone",
    "popular": false
  },
  {
    "name": "Candid Cream 30g",
    "category": "Skin Care & Topicals",
    "mrp": 115,
    "composition": "Clotrimazole 1% w/w",
    "popular": false
  },
  {
    "name": "Candid Dusting Powder 100g",
    "category": "Skin Care & Topicals",
    "mrp": 160,
    "composition": "Clotrimazole 1% w/w Antifungal Powder",
    "popular": true
  },
  {
    "name": "Candid Dusting Powder 50g",
    "category": "Skin Care & Topicals",
    "mrp": 95,
    "composition": "Clotrimazole 1% w/w",
    "popular": false
  },
  {
    "name": "Candid Mouth Paint 15ml",
    "category": "Skin Care & Topicals",
    "mrp": 120,
    "composition": "Clotrimazole 1% w/v Oral Candidiasis",
    "popular": false
  },
  {
    "name": "Canesten 1% Cream 30g",
    "category": "Skin Care & Topicals",
    "mrp": 125,
    "composition": "Clotrimazole 1% Broad Spectrum Antifungal",
    "popular": false
  },
  {
    "name": "Lulifin 1% Cream 30g",
    "category": "Skin Care & Topicals",
    "mrp": 340,
    "composition": "Luliconazole 1% w/w",
    "popular": true
  },
  {
    "name": "Lulifin 1% Cream 10g",
    "category": "Skin Care & Topicals",
    "mrp": 145,
    "composition": "Luliconazole 1% w/w",
    "popular": false
  },
  {
    "name": "Lulican 1% Cream 30g",
    "category": "Skin Care & Topicals",
    "mrp": 320,
    "composition": "Luliconazole 1% w/w",
    "popular": false
  },
  {
    "name": "Ebercon 1% Cream 30g",
    "category": "Skin Care & Topicals",
    "mrp": 360,
    "composition": "Eberconazole 1% w/w",
    "popular": false
  },
  {
    "name": "Ketocip 2% Shampoo 100ml",
    "category": "Skin Care & Topicals",
    "mrp": 210,
    "composition": "Ketoconazole 2% w/v Anti-Dandruff",
    "popular": true
  },
  {
    "name": "Scalpe Pro Shampoo 100ml",
    "category": "Skin Care & Topicals",
    "mrp": 225,
    "composition": "Ketoconazole + Zinc Pyrithione (ZPTO)",
    "popular": true
  },
  {
    "name": "Nizral 2% Solution 50ml",
    "category": "Skin Care & Topicals",
    "mrp": 195,
    "composition": "Ketoconazole 2% w/v",
    "popular": false
  },
  {
    "name": "Quadriderm RF Cream 15g",
    "category": "Skin Care & Topicals",
    "mrp": 120,
    "composition": "Beclomethasone + Clotrimazole + Neomycin",
    "popular": true
  },
  {
    "name": "Fourderm Cream 20g",
    "category": "Skin Care & Topicals",
    "mrp": 110,
    "composition": "Clobetasol + Neomycin + Miconazole + Chlorocresol",
    "popular": true
  },
  {
    "name": "Panderm Plus Cream 15g",
    "category": "Skin Care & Topicals",
    "mrp": 115,
    "composition": "Clobetasol + Neomycin + Terbinafine",
    "popular": false
  },
  {
    "name": "Betnovate-C Cream 20g",
    "category": "Skin Care & Topicals",
    "mrp": 65,
    "composition": "Betamethasone Valerate + Clioquinol",
    "popular": true
  },
  {
    "name": "Betnovate-N Cream 20g",
    "category": "Skin Care & Topicals",
    "mrp": 60,
    "composition": "Betamethasone 0.1% + Neomycin 0.5%",
    "popular": true
  },
  {
    "name": "Betnovate-GM Cream 20g",
    "category": "Skin Care & Topicals",
    "mrp": 75,
    "composition": "Betamethasone + Gentamicin + Miconazole",
    "popular": false
  },
  {
    "name": "Tenovate Cream 15g",
    "category": "Skin Care & Topicals",
    "mrp": 110,
    "composition": "Clobetasol Propionate 0.05% w/w",
    "popular": false
  },
  {
    "name": "Topinate Cream 15g",
    "category": "Skin Care & Topicals",
    "mrp": 105,
    "composition": "Clobetasol Propionate 0.05% w/w",
    "popular": false
  },
  {
    "name": "Elocon 0.1% Cream 15g",
    "category": "Skin Care & Topicals",
    "mrp": 240,
    "composition": "Mometasone Furoate 0.1% w/w",
    "popular": false
  },
  {
    "name": "Momate Cream 15g",
    "category": "Skin Care & Topicals",
    "mrp": 220,
    "composition": "Mometasone Furoate 0.1% w/w",
    "popular": true
  },
  {
    "name": "Flutivate Skin Cream 20g",
    "category": "Skin Care & Topicals",
    "mrp": 260,
    "composition": "Fluticasone Propionate 0.05% w/w",
    "popular": false
  },
  {
    "name": "Fucidin 2% Cream 15g",
    "category": "Skin Care & Topicals",
    "mrp": 165,
    "composition": "Sodium Fusidate 2% w/w",
    "popular": false
  },
  {
    "name": "Fucibet Cream 15g",
    "category": "Skin Care & Topicals",
    "mrp": 195,
    "composition": "Fusidic Acid + Betamethasone",
    "popular": false
  },
  {
    "name": "Tugain 5% Solution 60ml",
    "category": "Skin Care & Topicals",
    "mrp": 890,
    "composition": "Minoxidil 5% w/v Hair Regrowth",
    "popular": true
  },
  {
    "name": "Tugain 10% Solution 60ml",
    "category": "Skin Care & Topicals",
    "mrp": 1250,
    "composition": "Minoxidil 10% w/v",
    "popular": false
  },
  {
    "name": "Mintop 5% Solution 60ml",
    "category": "Skin Care & Topicals",
    "mrp": 860,
    "composition": "Minoxidil 5% w/v",
    "popular": false
  },
  {
    "name": "Morr-F 5% Solution 60ml",
    "category": "Skin Care & Topicals",
    "mrp": 980,
    "composition": "Minoxidil 5% + Finasteride 0.1%",
    "popular": true
  },
  {
    "name": "Permite 5% Cream 30g",
    "category": "Skin Care & Topicals",
    "mrp": 85,
    "composition": "Permethrin 5% w/w Anti-Scabies",
    "popular": false
  },
  {
    "name": "Scaboma Lotion 100ml",
    "category": "Skin Care & Topicals",
    "mrp": 110,
    "composition": "Lindane 1% w/v Scabies Lotion",
    "popular": false
  },
  {
    "name": "Acne-UV Gel SPF 50 50g",
    "category": "Skin Care & Topicals",
    "mrp": 680,
    "composition": "Broad Spectrum Sunscreen Gel",
    "popular": false
  },
  {
    "name": "Photostable Gel SPF 40 50g",
    "category": "Skin Care & Topicals",
    "mrp": 590,
    "composition": "Dermatological Sunscreen Gel",
    "popular": false
  },
  {
    "name": "Urimax 0.4mg Capsule",
    "category": "Urology & Kidney",
    "mrp": 295,
    "composition": "Tamsulosin Hydrochloride 0.4mg",
    "popular": true
  },
  {
    "name": "Urimax-D Capsule",
    "category": "Urology & Kidney",
    "mrp": 440,
    "composition": "Tamsulosin 0.4mg + Dutasteride 0.5mg",
    "popular": true
  },
  {
    "name": "Veltam 0.4mg Tablet",
    "category": "Urology & Kidney",
    "mrp": 280,
    "composition": "Tamsulosin Hydrochloride 0.4mg",
    "popular": false
  },
  {
    "name": "Veltam-Plus Tablet",
    "category": "Urology & Kidney",
    "mrp": 420,
    "composition": "Tamsulosin 0.4mg + Dutasteride 0.5mg",
    "popular": false
  },
  {
    "name": "Silodal 8mg Capsule",
    "category": "Urology & Kidney",
    "mrp": 380,
    "composition": "Silodosin 8mg",
    "popular": true
  },
  {
    "name": "Silodal 4mg Capsule",
    "category": "Urology & Kidney",
    "mrp": 240,
    "composition": "Silodosin 4mg",
    "popular": false
  },
  {
    "name": "Silodal-D 8/0.5 Capsule",
    "category": "Urology & Kidney",
    "mrp": 510,
    "composition": "Silodosin 8mg + Dutasteride 0.5mg",
    "popular": false
  },
  {
    "name": "Dutas 0.5mg Tablet",
    "category": "Urology & Kidney",
    "mrp": 195,
    "composition": "Dutasteride 0.5mg",
    "popular": false
  },
  {
    "name": "Alfusin 10mg Tablet",
    "category": "Urology & Kidney",
    "mrp": 260,
    "composition": "Alfuzosin Hydrochloride 10mg PR",
    "popular": false
  },
  {
    "name": "Alfusin-D Tablet",
    "category": "Urology & Kidney",
    "mrp": 395,
    "composition": "Alfuzosin 10mg + Dutasteride 0.5mg",
    "popular": false
  },
  {
    "name": "Roliten 2mg Tablet",
    "category": "Urology & Kidney",
    "mrp": 280,
    "composition": "Tolterodine Tartrate 2mg",
    "popular": false
  },
  {
    "name": "Urispas 200mg Tablet",
    "category": "Urology & Kidney",
    "mrp": 310,
    "composition": "Flavoxate Hydrochloride 200mg",
    "popular": true
  },
  {
    "name": "Flavospas 200 Tablet",
    "category": "Urology & Kidney",
    "mrp": 290,
    "composition": "Flavoxate 200mg",
    "popular": false
  },
  {
    "name": "Betmiga 50mg Tablet",
    "category": "Urology & Kidney",
    "mrp": 1850,
    "composition": "Mirabegron 50mg Prolonged Release",
    "popular": false
  },
  {
    "name": "Cystone Tablet 60s",
    "category": "Urology & Kidney",
    "mrp": 165,
    "composition": "Himalaya Herbal Ayurvedic Kidney Stone & UTI",
    "popular": true
  },
  {
    "name": "Cystone Syrup 200ml",
    "category": "Urology & Kidney",
    "mrp": 145,
    "composition": "Herbal Kidney Care Tonic",
    "popular": false
  },
  {
    "name": "K-Cit Oral Solution 450ml",
    "category": "Urology & Kidney",
    "mrp": 240,
    "composition": "Potassium Citrate + Citric Acid Solution",
    "popular": false
  },
  {
    "name": "Potrate-MB6 Solution 200ml",
    "category": "Urology & Kidney",
    "mrp": 190,
    "composition": "Potassium Citrate + Magnesium Citrate + Vitamin B6",
    "popular": false
  },
  {
    "name": "Feburic 40mg Tablet",
    "category": "Urology & Kidney",
    "mrp": 145,
    "composition": "Febuxostat 40mg",
    "popular": true
  },
  {
    "name": "Feburic 80mg Tablet",
    "category": "Urology & Kidney",
    "mrp": 240,
    "composition": "Febuxostat 80mg",
    "popular": false
  },
  {
    "name": "Febutaz 40mg Tablet",
    "category": "Urology & Kidney",
    "mrp": 140,
    "composition": "Febuxostat 40mg",
    "popular": false
  },
  {
    "name": "Zyloric 100mg Tablet",
    "category": "Urology & Kidney",
    "mrp": 32,
    "composition": "Allopurinol 100mg",
    "popular": false
  },
  {
    "name": "Zyloric 300mg Tablet",
    "category": "Urology & Kidney",
    "mrp": 85,
    "composition": "Allopurinol 300mg",
    "popular": false
  },
  {
    "name": "Keto-Steril Tablet",
    "category": "Urology & Kidney",
    "mrp": 2450,
    "composition": "Alpha-Ketoanalogue of Essential Amino Acids",
    "popular": false
  },
  {
    "name": "Ciplox Eye/Ear Drops 10ml",
    "category": "Eye & Ear Care",
    "mrp": 22,
    "composition": "Ciprofloxacin 0.3% w/v",
    "popular": true
  },
  {
    "name": "Ciplox-D Eye/Ear Drops 10ml",
    "category": "Eye & Ear Care",
    "mrp": 28,
    "composition": "Ciprofloxacin 0.3% + Dexamethasone 0.1%",
    "popular": true
  },
  {
    "name": "Tobastar Eye Drops 5ml",
    "category": "Eye & Ear Care",
    "mrp": 95,
    "composition": "Tobramycin 0.3% w/v",
    "popular": true
  },
  {
    "name": "Toba Eye Drops 5ml",
    "category": "Eye & Ear Care",
    "mrp": 90,
    "composition": "Tobramycin 0.3% w/v",
    "popular": false
  },
  {
    "name": "Tobastar-D Eye Drops 5ml",
    "category": "Eye & Ear Care",
    "mrp": 110,
    "composition": "Tobramycin 0.3% + Dexamethasone 0.1%",
    "popular": false
  },
  {
    "name": "Moxicip Eye Drops 5ml",
    "category": "Eye & Ear Care",
    "mrp": 135,
    "composition": "Moxifloxacin 0.5% w/v",
    "popular": true
  },
  {
    "name": "Moxicip-D Eye Drops 5ml",
    "category": "Eye & Ear Care",
    "mrp": 165,
    "composition": "Moxifloxacin 0.5% + Dexamethasone 0.1%",
    "popular": false
  },
  {
    "name": "Moxicip-KT Eye Drops 5ml",
    "category": "Eye & Ear Care",
    "mrp": 180,
    "composition": "Moxifloxacin + Ketorolac Tromethamine",
    "popular": false
  },
  {
    "name": "Vigamox Eye Drops 5ml",
    "category": "Eye & Ear Care",
    "mrp": 280,
    "composition": "Moxifloxacin 0.5% (Alcon)",
    "popular": false
  },
  {
    "name": "Mahaflox Eye Drops 5ml",
    "category": "Eye & Ear Care",
    "mrp": 125,
    "composition": "Moxifloxacin 0.5% w/v",
    "popular": false
  },
  {
    "name": "Refresh Tears Eye Drops 10ml",
    "category": "Eye & Ear Care",
    "mrp": 160,
    "composition": "Carboxymethylcellulose Sodium 0.5%",
    "popular": true
  },
  {
    "name": "Refresh Liquigel 10ml",
    "category": "Eye & Ear Care",
    "mrp": 215,
    "composition": "Carboxymethylcellulose Sodium 1%",
    "popular": false
  },
  {
    "name": "Tears Naturale II 10ml",
    "category": "Eye & Ear Care",
    "mrp": 185,
    "composition": "Dextran 70 0.1% + Hypromellose 0.3%",
    "popular": false
  },
  {
    "name": "Systane Ultra Eye Drops 10ml",
    "category": "Eye & Ear Care",
    "mrp": 420,
    "composition": "Polyethylene Glycol 400 + Propylene Glycol",
    "popular": true
  },
  {
    "name": "Systane Hydration 10ml",
    "category": "Eye & Ear Care",
    "mrp": 460,
    "composition": "Sodium Hyaluronate + HP-Guar",
    "popular": false
  },
  {
    "name": "Genteal Eye Drops 10ml",
    "category": "Eye & Ear Care",
    "mrp": 210,
    "composition": "Hypromellose 0.3% Lubricant Eye Drops",
    "popular": false
  },
  {
    "name": "Lotepred Eye Drops 5ml",
    "category": "Eye & Ear Care",
    "mrp": 195,
    "composition": "Loteprednol Etabonate 0.5%",
    "popular": false
  },
  {
    "name": "Pred Forte Eye Drops 5ml",
    "category": "Eye & Ear Care",
    "mrp": 165,
    "composition": "Prednisolone Acetate 1% w/v",
    "popular": false
  },
  {
    "name": "Nepaflam Eye Drops 5ml",
    "category": "Eye & Ear Care",
    "mrp": 240,
    "composition": "Nepafenac 0.1% w/v",
    "popular": false
  },
  {
    "name": "Nevanac Eye Drops 5ml",
    "category": "Eye & Ear Care",
    "mrp": 340,
    "composition": "Nepafenac 0.1% Ophthalmic Suspension",
    "popular": false
  },
  {
    "name": "Timolol 0.5% Eye Drops 5ml",
    "category": "Eye & Ear Care",
    "mrp": 65,
    "composition": "Timolol Maleate 0.5% w/v Anti-Glaucoma",
    "popular": false
  },
  {
    "name": "Travatan Eye Drops 2.5ml",
    "category": "Eye & Ear Care",
    "mrp": 690,
    "composition": "Travoprost 0.004% Anti-Glaucoma",
    "popular": false
  },
  {
    "name": "Lumigan 0.01% Eye Drops 3ml",
    "category": "Eye & Ear Care",
    "mrp": 740,
    "composition": "Bimatoprost 0.01% Ophthalmic",
    "popular": false
  },
  {
    "name": "Waxolve Ear Drops 10ml",
    "category": "Eye & Ear Care",
    "mrp": 85,
    "composition": "Paradichlorobenzene + Benzocaine + Turpentine Oil",
    "popular": true
  },
  {
    "name": "Soliwax Ear Drops 10ml",
    "category": "Eye & Ear Care",
    "mrp": 95,
    "composition": "Paradichlorobenzene + Chlorbutol Ear Wax Remover",
    "popular": true
  },
  {
    "name": "Otorex Ear Drops 10ml",
    "category": "Eye & Ear Care",
    "mrp": 90,
    "composition": "Ear Wax Softener with Benzocaine",
    "popular": false
  },
  {
    "name": "Clearwax Ear Drops 10ml",
    "category": "Eye & Ear Care",
    "mrp": 80,
    "composition": "Sodium Bicarbonate Ear Drops",
    "popular": false
  },
  {
    "name": "Cipla Paracetamol Tablet (Standard)",
    "category": "Fever & Pain",
    "mrp": 15,
    "composition": "Paracetamol 500mg IP",
    "popular": false
  },
  {
    "name": "Cipla Paracetamol Tablet (Forte)",
    "category": "Fever & Pain",
    "mrp": 25,
    "composition": "Paracetamol 650mg IP",
    "popular": false
  },
  {
    "name": "Cipla Paracetamol Tablet (Plus)",
    "category": "Fever & Pain",
    "mrp": 35,
    "composition": "Paracetamol 1000mg Infusion",
    "popular": false
  },
  {
    "name": "Cipla Aceclofenac Tablet (Standard)",
    "category": "Pain Relief",
    "mrp": 45,
    "composition": "Aceclofenac 100mg",
    "popular": false
  },
  {
    "name": "Cipla Aceclofenac Tablet (Forte)",
    "category": "Pain Relief",
    "mrp": 65,
    "composition": "Aceclofenac 100mg + Paracetamol 325mg",
    "popular": false
  },
  {
    "name": "Cipla Aceclofenac Tablet (Plus)",
    "category": "Pain Relief",
    "mrp": 95,
    "composition": "Aceclofenac 200mg SR",
    "popular": false
  },
  {
    "name": "Cipla Diclofenac Tablet (Standard)",
    "category": "Pain Relief",
    "mrp": 35,
    "composition": "Diclofenac Potassium 50mg",
    "popular": false
  },
  {
    "name": "Cipla Diclofenac Tablet (Forte)",
    "category": "Pain Relief",
    "mrp": 55,
    "composition": "Diclofenac 75mg Injection",
    "popular": false
  },
  {
    "name": "Cipla Diclofenac Tablet (Plus)",
    "category": "Pain Relief",
    "mrp": 80,
    "composition": "Diclofenac 100mg SR",
    "popular": false
  },
  {
    "name": "Cipla Amoxicillin Tablet (Standard)",
    "category": "Antibiotic",
    "mrp": 45,
    "composition": "Amoxicillin Trihydrate 250mg",
    "popular": false
  },
  {
    "name": "Cipla Amoxicillin Tablet (Forte)",
    "category": "Antibiotic",
    "mrp": 75,
    "composition": "Amoxicillin Trihydrate 500mg",
    "popular": false
  },
  {
    "name": "Cipla Amoxicillin Tablet (Plus)",
    "category": "Antibiotic",
    "mrp": 120,
    "composition": "Amoxicillin + Clavulanic Acid 625mg",
    "popular": false
  },
  {
    "name": "Cipla Cefixime Tablet (Standard)",
    "category": "Antibiotic",
    "mrp": 70,
    "composition": "Cefixime 100mg DT",
    "popular": false
  },
  {
    "name": "Cipla Cefixime Tablet (Forte)",
    "category": "Antibiotic",
    "mrp": 110,
    "composition": "Cefixime 200mg IP",
    "popular": false
  },
  {
    "name": "Cipla Cefixime Tablet (Plus)",
    "category": "Antibiotic",
    "mrp": 180,
    "composition": "Cefixime 200mg + Ofloxacin 200mg",
    "popular": false
  },
  {
    "name": "Cipla Cefpodoxime Tablet (Standard)",
    "category": "Antibiotic",
    "mrp": 95,
    "composition": "Cefpodoxime Proxetil 100mg",
    "popular": false
  },
  {
    "name": "Cipla Cefpodoxime Tablet (Forte)",
    "category": "Antibiotic",
    "mrp": 175,
    "composition": "Cefpodoxime Proxetil 200mg",
    "popular": false
  },
  {
    "name": "Cipla Cefpodoxime Tablet (Plus)",
    "category": "Antibiotic",
    "mrp": 280,
    "composition": "Cefpodoxime + Clavulanate 325mg",
    "popular": false
  },
  {
    "name": "Cipla Azithromycin Tablet (Standard)",
    "category": "Antibiotic",
    "mrp": 70,
    "composition": "Azithromycin 250mg IP",
    "popular": false
  },
  {
    "name": "Cipla Azithromycin Tablet (Forte)",
    "category": "Antibiotic",
    "mrp": 130,
    "composition": "Azithromycin 500mg IP",
    "popular": false
  },
  {
    "name": "Cipla Azithromycin Tablet (Plus)",
    "category": "Antibiotic",
    "mrp": 220,
    "composition": "Azithromycin 100mg Pead Oral",
    "popular": false
  },
  {
    "name": "Cipla Ciprofloxacin Tablet (Standard)",
    "category": "Antibiotic",
    "mrp": 30,
    "composition": "Ciprofloxacin 250mg",
    "popular": false
  },
  {
    "name": "Cipla Ciprofloxacin Tablet (Forte)",
    "category": "Antibiotic",
    "mrp": 50,
    "composition": "Ciprofloxacin 500mg IP",
    "popular": false
  },
  {
    "name": "Cipla Ciprofloxacin Tablet (Plus)",
    "category": "Antibiotic",
    "mrp": 85,
    "composition": "Ciprofloxacin + Tinidazole",
    "popular": false
  },
  {
    "name": "Cipla Levofloxacin Tablet (Standard)",
    "category": "Antibiotic",
    "mrp": 55,
    "composition": "Levofloxacin 250mg",
    "popular": false
  },
  {
    "name": "Cipla Levofloxacin Tablet (Forte)",
    "category": "Antibiotic",
    "mrp": 95,
    "composition": "Levofloxacin 500mg IP",
    "popular": false
  },
  {
    "name": "Cipla Levofloxacin Tablet (Plus)",
    "category": "Antibiotic",
    "mrp": 140,
    "composition": "Levofloxacin 750mg IP",
    "popular": false
  },
  {
    "name": "Cipla Pantoprazole Tablet (Standard)",
    "category": "Antacid",
    "mrp": 65,
    "composition": "Pantoprazole 20mg",
    "popular": false
  },
  {
    "name": "Cipla Pantoprazole Tablet (Forte)",
    "category": "Antacid",
    "mrp": 135,
    "composition": "Pantoprazole 40mg IP",
    "popular": false
  },
  {
    "name": "Cipla Pantoprazole Tablet (Plus)",
    "category": "Antacid",
    "mrp": 190,
    "composition": "Pantoprazole 40mg + Domperidone 30mg",
    "popular": false
  },
  {
    "name": "Cipla Rabeprazole Tablet (Standard)",
    "category": "Antacid",
    "mrp": 75,
    "composition": "Rabeprazole 20mg",
    "popular": false
  },
  {
    "name": "Cipla Rabeprazole Tablet (Forte)",
    "category": "Antacid",
    "mrp": 125,
    "composition": "Rabeprazole 20mg + Domperidone 30mg SR",
    "popular": false
  },
  {
    "name": "Cipla Rabeprazole Tablet (Plus)",
    "category": "Antacid",
    "mrp": 210,
    "composition": "Rabeprazole 20mg + Levosulpiride 75mg",
    "popular": false
  },
  {
    "name": "Cipla Omeprazole Tablet (Standard)",
    "category": "Antacid",
    "mrp": 35,
    "composition": "Omeprazole 10mg",
    "popular": false
  },
  {
    "name": "Cipla Omeprazole Tablet (Forte)",
    "category": "Antacid",
    "mrp": 55,
    "composition": "Omeprazole 20mg IP",
    "popular": false
  },
  {
    "name": "Cipla Omeprazole Tablet (Plus)",
    "category": "Antacid",
    "mrp": 120,
    "composition": "Omeprazole 20mg + Domperidone 10mg",
    "popular": false
  },
  {
    "name": "Cipla Telmisartan Tablet (Standard)",
    "category": "Blood Pressure",
    "mrp": 75,
    "composition": "Telmisartan 20mg",
    "popular": false
  },
  {
    "name": "Cipla Telmisartan Tablet (Forte)",
    "category": "Blood Pressure",
    "mrp": 130,
    "composition": "Telmisartan 40mg IP",
    "popular": false
  },
  {
    "name": "Cipla Telmisartan Tablet (Plus)",
    "category": "Blood Pressure",
    "mrp": 220,
    "composition": "Telmisartan 40mg + Hydrochlorothiazide 12.5mg",
    "popular": false
  },
  {
    "name": "Cipla Amlodipine Tablet (Standard)",
    "category": "Blood Pressure",
    "mrp": 35,
    "composition": "Amlodipine 2.5mg",
    "popular": false
  },
  {
    "name": "Cipla Amlodipine Tablet (Forte)",
    "category": "Blood Pressure",
    "mrp": 65,
    "composition": "Amlodipine 5mg IP",
    "popular": false
  },
  {
    "name": "Cipla Amlodipine Tablet (Plus)",
    "category": "Blood Pressure",
    "mrp": 95,
    "composition": "Amlodipine 10mg IP",
    "popular": false
  },
  {
    "name": "Cipla Metoprolol Tablet (Standard)",
    "category": "Blood Pressure",
    "mrp": 60,
    "composition": "Metoprolol Succinate 25mg ER",
    "popular": false
  },
  {
    "name": "Cipla Metoprolol Tablet (Forte)",
    "category": "Blood Pressure",
    "mrp": 110,
    "composition": "Metoprolol Succinate 50mg ER",
    "popular": false
  },
  {
    "name": "Cipla Metoprolol Tablet (Plus)",
    "category": "Blood Pressure",
    "mrp": 160,
    "composition": "Metoprolol 25mg + Amlodipine 5mg",
    "popular": false
  },
  {
    "name": "Cipla Atorvastatin Tablet (Standard)",
    "category": "Blood Pressure",
    "mrp": 70,
    "composition": "Atorvastatin 10mg IP",
    "popular": false
  },
  {
    "name": "Cipla Atorvastatin Tablet (Forte)",
    "category": "Blood Pressure",
    "mrp": 120,
    "composition": "Atorvastatin 20mg IP",
    "popular": false
  },
  {
    "name": "Cipla Atorvastatin Tablet (Plus)",
    "category": "Blood Pressure",
    "mrp": 210,
    "composition": "Atorvastatin 40mg IP",
    "popular": false
  },
  {
    "name": "Cipla Rosuvastatin Tablet (Standard)",
    "category": "Blood Pressure",
    "mrp": 95,
    "composition": "Rosuvastatin 5mg IP",
    "popular": false
  },
  {
    "name": "Cipla Rosuvastatin Tablet (Forte)",
    "category": "Blood Pressure",
    "mrp": 180,
    "composition": "Rosuvastatin 10mg IP",
    "popular": false
  },
  {
    "name": "Cipla Rosuvastatin Tablet (Plus)",
    "category": "Blood Pressure",
    "mrp": 310,
    "composition": "Rosuvastatin 20mg IP",
    "popular": false
  },
  {
    "name": "Cipla Metformin Tablet (Standard)",
    "category": "Diabetes",
    "mrp": 30,
    "composition": "Metformin 500mg SR",
    "popular": false
  },
  {
    "name": "Cipla Metformin Tablet (Forte)",
    "category": "Diabetes",
    "mrp": 50,
    "composition": "Metformin 850mg IP",
    "popular": false
  },
  {
    "name": "Cipla Metformin Tablet (Plus)",
    "category": "Diabetes",
    "mrp": 85,
    "composition": "Metformin 1000mg SR",
    "popular": false
  },
  {
    "name": "Cipla Glimepiride Tablet (Standard)",
    "category": "Diabetes",
    "mrp": 65,
    "composition": "Glimepiride 1mg IP",
    "popular": false
  },
  {
    "name": "Cipla Glimepiride Tablet (Forte)",
    "category": "Diabetes",
    "mrp": 120,
    "composition": "Glimepiride 2mg IP",
    "popular": false
  },
  {
    "name": "Cipla Glimepiride Tablet (Plus)",
    "category": "Diabetes",
    "mrp": 180,
    "composition": "Glimepiride 1mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Cipla Vildagliptin Tablet (Standard)",
    "category": "Diabetes",
    "mrp": 140,
    "composition": "Vildagliptin 50mg",
    "popular": false
  },
  {
    "name": "Cipla Vildagliptin Tablet (Forte)",
    "category": "Diabetes",
    "mrp": 220,
    "composition": "Vildagliptin 50mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Cipla Vildagliptin Tablet (Plus)",
    "category": "Diabetes",
    "mrp": 290,
    "composition": "Vildagliptin 50mg + Metformin 1000mg",
    "popular": false
  },
  {
    "name": "Cipla Dapagliflozin Tablet (Standard)",
    "category": "Diabetes",
    "mrp": 120,
    "composition": "Dapagliflozin 5mg",
    "popular": false
  },
  {
    "name": "Cipla Dapagliflozin Tablet (Forte)",
    "category": "Diabetes",
    "mrp": 195,
    "composition": "Dapagliflozin 10mg IP",
    "popular": false
  },
  {
    "name": "Cipla Dapagliflozin Tablet (Plus)",
    "category": "Diabetes",
    "mrp": 290,
    "composition": "Dapagliflozin 10mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Cipla Montelukast Tablet (Standard)",
    "category": "Allergy & Cold",
    "mrp": 85,
    "composition": "Montelukast 5mg Chewable",
    "popular": false
  },
  {
    "name": "Cipla Montelukast Tablet (Forte)",
    "category": "Allergy & Cold",
    "mrp": 140,
    "composition": "Montelukast 10mg IP",
    "popular": false
  },
  {
    "name": "Cipla Montelukast Tablet (Plus)",
    "category": "Allergy & Cold",
    "mrp": 195,
    "composition": "Montelukast 10mg + Levocetirizine 5mg",
    "popular": false
  },
  {
    "name": "Cipla Levocetirizine Syrup (Standard)",
    "category": "Allergy & Cold",
    "mrp": 35,
    "composition": "Levocetirizine 2.5mg/5ml Syrup",
    "popular": false
  },
  {
    "name": "Cipla Levocetirizine Tablet (Forte)",
    "category": "Allergy & Cold",
    "mrp": 55,
    "composition": "Levocetirizine 5mg IP",
    "popular": false
  },
  {
    "name": "Cipla Levocetirizine Tablet (Plus)",
    "category": "Allergy & Cold",
    "mrp": 85,
    "composition": "Levocetirizine 10mg IP",
    "popular": false
  },
  {
    "name": "Cipla Cetirizine Syrup (Standard)",
    "category": "Allergy & Cold",
    "mrp": 25,
    "composition": "Cetirizine 5mg/5ml Syrup",
    "popular": false
  },
  {
    "name": "Cipla Cetirizine Tablet (Forte)",
    "category": "Allergy & Cold",
    "mrp": 40,
    "composition": "Cetirizine 10mg IP",
    "popular": false
  },
  {
    "name": "Cipla Cetirizine Tablet (Plus)",
    "category": "Allergy & Cold",
    "mrp": 65,
    "composition": "Cetirizine + Phenylephrine + Paracetamol",
    "popular": false
  },
  {
    "name": "Cipla Fexofenadine Tablet (Standard)",
    "category": "Allergy & Cold",
    "mrp": 95,
    "composition": "Fexofenadine 30mg Pead",
    "popular": false
  },
  {
    "name": "Cipla Fexofenadine Tablet (Forte)",
    "category": "Allergy & Cold",
    "mrp": 145,
    "composition": "Fexofenadine 120mg IP",
    "popular": false
  },
  {
    "name": "Cipla Fexofenadine Tablet (Plus)",
    "category": "Allergy & Cold",
    "mrp": 210,
    "composition": "Fexofenadine 180mg IP",
    "popular": false
  },
  {
    "name": "Cipla Calcium + D3 Tablet (Standard)",
    "category": "Supplements",
    "mrp": 85,
    "composition": "Calcium Carbonate 500mg + D3 250 IU",
    "popular": false
  },
  {
    "name": "Cipla Calcium + D3 Tablet (Forte)",
    "category": "Supplements",
    "mrp": 130,
    "composition": "Calcium 500mg + D3 500 IU",
    "popular": false
  },
  {
    "name": "Cipla Calcium + D3 Tablet (Plus)",
    "category": "Supplements",
    "mrp": 210,
    "composition": "Calcium Citrate Malate + Vitamin D3",
    "popular": false
  },
  {
    "name": "Cipla Vitamin D3 Drops (Standard)",
    "category": "Supplements",
    "mrp": 45,
    "composition": "Cholecalciferol 800 IU/ml Drops",
    "popular": false
  },
  {
    "name": "Cipla Vitamin D3 Tablet (Forte)",
    "category": "Supplements",
    "mrp": 110,
    "composition": "Cholecalciferol 60,000 IU Sachet",
    "popular": false
  },
  {
    "name": "Cipla Vitamin D3 Tablet (Plus)",
    "category": "Supplements",
    "mrp": 260,
    "composition": "Cholecalciferol 60,000 IU Capsule",
    "popular": false
  },
  {
    "name": "Cipla B-Complex + Zinc Tablet (Standard)",
    "category": "Supplements",
    "mrp": 40,
    "composition": "Vitamin B Complex + Vitamin C",
    "popular": false
  },
  {
    "name": "Cipla B-Complex + Zinc Syrup (Forte)",
    "category": "Supplements",
    "mrp": 65,
    "composition": "B-Complex + L-Lysine Syrup",
    "popular": false
  },
  {
    "name": "Cipla B-Complex + Zinc Tablet (Plus)",
    "category": "Supplements",
    "mrp": 95,
    "composition": "B-Complex with Zinc & Folic Acid",
    "popular": false
  },
  {
    "name": "Cipla Iron + Folic Acid Tablet (Standard)",
    "category": "Supplements",
    "mrp": 75,
    "composition": "Ferrous Ascorbate + Folic Acid",
    "popular": false
  },
  {
    "name": "Cipla Iron + Folic Acid Tablet (Forte)",
    "category": "Supplements",
    "mrp": 120,
    "composition": "Ferrous Fumarate + Folic Acid + B12",
    "popular": false
  },
  {
    "name": "Cipla Iron + Folic Acid Tablet (Plus)",
    "category": "Supplements",
    "mrp": 190,
    "composition": "Iron Tonic with Zinc",
    "popular": false
  },
  {
    "name": "Cipla Multivitamin Tablet (Standard)",
    "category": "Supplements",
    "mrp": 65,
    "composition": "Multivitamin with Minerals Tablet",
    "popular": false
  },
  {
    "name": "Cipla Multivitamin Syrup (Forte)",
    "category": "Supplements",
    "mrp": 110,
    "composition": "Multivitamin Daily Syrup",
    "popular": false
  },
  {
    "name": "Cipla Multivitamin Tablet (Plus)",
    "category": "Supplements",
    "mrp": 185,
    "composition": "Multivitamins with Ginseng Capsule",
    "popular": false
  },
  {
    "name": "Cipla Thyroxine Tablet (Standard)",
    "category": "Thyroid & Hormones",
    "mrp": 130,
    "composition": "Thyroxine Sodium 25mcg",
    "popular": false
  },
  {
    "name": "Cipla Thyroxine Tablet (Forte)",
    "category": "Thyroid & Hormones",
    "mrp": 160,
    "composition": "Thyroxine Sodium 50mcg",
    "popular": false
  },
  {
    "name": "Cipla Thyroxine Tablet (Plus)",
    "category": "Thyroid & Hormones",
    "mrp": 195,
    "composition": "Thyroxine Sodium 100mcg",
    "popular": false
  },
  {
    "name": "Cipla Clonazepam Tablet (Standard)",
    "category": "Neurology",
    "mrp": 35,
    "composition": "Clonazepam 0.25mg",
    "popular": false
  },
  {
    "name": "Cipla Clonazepam Tablet (Forte)",
    "category": "Neurology",
    "mrp": 55,
    "composition": "Clonazepam 0.5mg IP",
    "popular": false
  },
  {
    "name": "Cipla Clonazepam Tablet (Plus)",
    "category": "Neurology",
    "mrp": 95,
    "composition": "Clonazepam 1mg IP",
    "popular": false
  },
  {
    "name": "Cipla Escitalopram Tablet (Standard)",
    "category": "Neurology",
    "mrp": 65,
    "composition": "Escitalopram 5mg",
    "popular": false
  },
  {
    "name": "Cipla Escitalopram Tablet (Forte)",
    "category": "Neurology",
    "mrp": 110,
    "composition": "Escitalopram 10mg IP",
    "popular": false
  },
  {
    "name": "Cipla Escitalopram Tablet (Plus)",
    "category": "Neurology",
    "mrp": 160,
    "composition": "Escitalopram 20mg IP",
    "popular": false
  },
  {
    "name": "Cipla Pregabalin Tablet (Standard)",
    "category": "Neurology",
    "mrp": 95,
    "composition": "Pregabalin 50mg",
    "popular": false
  },
  {
    "name": "Cipla Pregabalin Tablet (Forte)",
    "category": "Neurology",
    "mrp": 165,
    "composition": "Pregabalin 75mg IP",
    "popular": false
  },
  {
    "name": "Cipla Pregabalin Tablet (Plus)",
    "category": "Neurology",
    "mrp": 280,
    "composition": "Pregabalin 75mg + Methylcobalamin 750mcg",
    "popular": false
  },
  {
    "name": "Cipla Betahistine Tablet (Standard)",
    "category": "Neurology",
    "mrp": 110,
    "composition": "Betahistine 8mg",
    "popular": false
  },
  {
    "name": "Cipla Betahistine Tablet (Forte)",
    "category": "Neurology",
    "mrp": 185,
    "composition": "Betahistine 16mg IP",
    "popular": false
  },
  {
    "name": "Cipla Betahistine Tablet (Plus)",
    "category": "Neurology",
    "mrp": 290,
    "composition": "Betahistine 24mg IP",
    "popular": false
  },
  {
    "name": "Cipla Clotrimazole Ointment (Standard)",
    "category": "Skin Care & Topicals",
    "mrp": 55,
    "composition": "Clotrimazole 1% Cream",
    "popular": false
  },
  {
    "name": "Cipla Clotrimazole Powder (Forte)",
    "category": "Skin Care & Topicals",
    "mrp": 85,
    "composition": "Clotrimazole 1% Dusting Powder",
    "popular": false
  },
  {
    "name": "Cipla Clotrimazole Ointment (Plus)",
    "category": "Skin Care & Topicals",
    "mrp": 125,
    "composition": "Clotrimazole + Beclomethasone Cream",
    "popular": false
  },
  {
    "name": "Cipla Mupirocin Ointment (Standard)",
    "category": "Skin Care & Topicals",
    "mrp": 80,
    "composition": "Mupirocin 2% w/w Ointment 5g",
    "popular": false
  },
  {
    "name": "Cipla Mupirocin Ointment (Forte)",
    "category": "Skin Care & Topicals",
    "mrp": 135,
    "composition": "Mupirocin 2% w/w Ointment 10g",
    "popular": false
  },
  {
    "name": "Cipla Mupirocin Ointment (Plus)",
    "category": "Skin Care & Topicals",
    "mrp": 190,
    "composition": "Mupirocin 2% w/w Ointment 15g",
    "popular": false
  },
  {
    "name": "Cipla Luliconazole Ointment (Standard)",
    "category": "Skin Care & Topicals",
    "mrp": 110,
    "composition": "Luliconazole 1% Cream 10g",
    "popular": false
  },
  {
    "name": "Cipla Luliconazole Ointment (Forte)",
    "category": "Skin Care & Topicals",
    "mrp": 195,
    "composition": "Luliconazole 1% Cream 20g",
    "popular": false
  },
  {
    "name": "Cipla Luliconazole Ointment (Plus)",
    "category": "Skin Care & Topicals",
    "mrp": 290,
    "composition": "Luliconazole 1% Cream 30g",
    "popular": false
  },
  {
    "name": "Cipla Ciprofloxacin Eye Drops Drops (Standard)",
    "category": "Eye & Ear Care",
    "mrp": 20,
    "composition": "Ciprofloxacin 0.3% Eye Drops",
    "popular": false
  },
  {
    "name": "Cipla Ciprofloxacin Eye Drops Drops (Forte)",
    "category": "Eye & Ear Care",
    "mrp": 28,
    "composition": "Ciprofloxacin + Dexamethasone Drops",
    "popular": false
  },
  {
    "name": "Cipla Ciprofloxacin Eye Drops Ointment (Plus)",
    "category": "Eye & Ear Care",
    "mrp": 45,
    "composition": "Ciprofloxacin Eye Ointment",
    "popular": false
  },
  {
    "name": "Cipla Moxifloxacin Eye Drops Drops (Standard)",
    "category": "Eye & Ear Care",
    "mrp": 95,
    "composition": "Moxifloxacin 0.5% Eye Drops",
    "popular": false
  },
  {
    "name": "Cipla Moxifloxacin Eye Drops Drops (Forte)",
    "category": "Eye & Ear Care",
    "mrp": 140,
    "composition": "Moxifloxacin + Dexamethasone Drops",
    "popular": false
  },
  {
    "name": "Cipla Moxifloxacin Eye Drops Drops (Plus)",
    "category": "Eye & Ear Care",
    "mrp": 190,
    "composition": "Moxifloxacin + Ketorolac Drops",
    "popular": false
  },
  {
    "name": "Cipla Carboxymethylcellulose Drops (Standard)",
    "category": "Eye & Ear Care",
    "mrp": 120,
    "composition": "Carboxymethylcellulose 0.5% Drops",
    "popular": false
  },
  {
    "name": "Cipla Carboxymethylcellulose Tablet (Forte)",
    "category": "Eye & Ear Care",
    "mrp": 175,
    "composition": "Carboxymethylcellulose 1% Liquigel",
    "popular": false
  },
  {
    "name": "Cipla Carboxymethylcellulose Drops (Plus)",
    "category": "Eye & Ear Care",
    "mrp": 240,
    "composition": "Sodium Hyaluronate 0.1% Eye Drops",
    "popular": false
  },
  {
    "name": "Sun Paracetamol Tablet (Standard)",
    "category": "Fever & Pain",
    "mrp": 15,
    "composition": "Paracetamol 500mg IP",
    "popular": false
  },
  {
    "name": "Sun Paracetamol Tablet (Forte)",
    "category": "Fever & Pain",
    "mrp": 25,
    "composition": "Paracetamol 650mg IP",
    "popular": false
  },
  {
    "name": "Sun Paracetamol Tablet (Plus)",
    "category": "Fever & Pain",
    "mrp": 35,
    "composition": "Paracetamol 1000mg Infusion",
    "popular": false
  },
  {
    "name": "Sun Aceclofenac Tablet (Standard)",
    "category": "Pain Relief",
    "mrp": 45,
    "composition": "Aceclofenac 100mg",
    "popular": false
  },
  {
    "name": "Sun Aceclofenac Tablet (Forte)",
    "category": "Pain Relief",
    "mrp": 65,
    "composition": "Aceclofenac 100mg + Paracetamol 325mg",
    "popular": false
  },
  {
    "name": "Sun Aceclofenac Tablet (Plus)",
    "category": "Pain Relief",
    "mrp": 95,
    "composition": "Aceclofenac 200mg SR",
    "popular": false
  },
  {
    "name": "Sun Diclofenac Tablet (Standard)",
    "category": "Pain Relief",
    "mrp": 35,
    "composition": "Diclofenac Potassium 50mg",
    "popular": false
  },
  {
    "name": "Sun Diclofenac Tablet (Forte)",
    "category": "Pain Relief",
    "mrp": 55,
    "composition": "Diclofenac 75mg Injection",
    "popular": false
  },
  {
    "name": "Sun Diclofenac Tablet (Plus)",
    "category": "Pain Relief",
    "mrp": 80,
    "composition": "Diclofenac 100mg SR",
    "popular": false
  },
  {
    "name": "Sun Amoxicillin Tablet (Standard)",
    "category": "Antibiotic",
    "mrp": 45,
    "composition": "Amoxicillin Trihydrate 250mg",
    "popular": false
  },
  {
    "name": "Sun Amoxicillin Tablet (Forte)",
    "category": "Antibiotic",
    "mrp": 75,
    "composition": "Amoxicillin Trihydrate 500mg",
    "popular": false
  },
  {
    "name": "Sun Amoxicillin Tablet (Plus)",
    "category": "Antibiotic",
    "mrp": 120,
    "composition": "Amoxicillin + Clavulanic Acid 625mg",
    "popular": false
  },
  {
    "name": "Sun Cefixime Tablet (Standard)",
    "category": "Antibiotic",
    "mrp": 70,
    "composition": "Cefixime 100mg DT",
    "popular": false
  },
  {
    "name": "Sun Cefixime Tablet (Forte)",
    "category": "Antibiotic",
    "mrp": 110,
    "composition": "Cefixime 200mg IP",
    "popular": false
  },
  {
    "name": "Sun Cefixime Tablet (Plus)",
    "category": "Antibiotic",
    "mrp": 180,
    "composition": "Cefixime 200mg + Ofloxacin 200mg",
    "popular": false
  },
  {
    "name": "Sun Cefpodoxime Tablet (Standard)",
    "category": "Antibiotic",
    "mrp": 95,
    "composition": "Cefpodoxime Proxetil 100mg",
    "popular": false
  },
  {
    "name": "Sun Cefpodoxime Tablet (Forte)",
    "category": "Antibiotic",
    "mrp": 175,
    "composition": "Cefpodoxime Proxetil 200mg",
    "popular": false
  },
  {
    "name": "Sun Cefpodoxime Tablet (Plus)",
    "category": "Antibiotic",
    "mrp": 280,
    "composition": "Cefpodoxime + Clavulanate 325mg",
    "popular": false
  },
  {
    "name": "Sun Azithromycin Tablet (Standard)",
    "category": "Antibiotic",
    "mrp": 70,
    "composition": "Azithromycin 250mg IP",
    "popular": false
  },
  {
    "name": "Sun Azithromycin Tablet (Forte)",
    "category": "Antibiotic",
    "mrp": 130,
    "composition": "Azithromycin 500mg IP",
    "popular": false
  },
  {
    "name": "Sun Azithromycin Tablet (Plus)",
    "category": "Antibiotic",
    "mrp": 220,
    "composition": "Azithromycin 100mg Pead Oral",
    "popular": false
  },
  {
    "name": "Sun Ciprofloxacin Tablet (Standard)",
    "category": "Antibiotic",
    "mrp": 30,
    "composition": "Ciprofloxacin 250mg",
    "popular": false
  },
  {
    "name": "Sun Ciprofloxacin Tablet (Forte)",
    "category": "Antibiotic",
    "mrp": 50,
    "composition": "Ciprofloxacin 500mg IP",
    "popular": false
  },
  {
    "name": "Sun Ciprofloxacin Tablet (Plus)",
    "category": "Antibiotic",
    "mrp": 85,
    "composition": "Ciprofloxacin + Tinidazole",
    "popular": false
  },
  {
    "name": "Sun Levofloxacin Tablet (Standard)",
    "category": "Antibiotic",
    "mrp": 55,
    "composition": "Levofloxacin 250mg",
    "popular": false
  },
  {
    "name": "Sun Levofloxacin Tablet (Forte)",
    "category": "Antibiotic",
    "mrp": 95,
    "composition": "Levofloxacin 500mg IP",
    "popular": false
  },
  {
    "name": "Sun Levofloxacin Tablet (Plus)",
    "category": "Antibiotic",
    "mrp": 140,
    "composition": "Levofloxacin 750mg IP",
    "popular": false
  },
  {
    "name": "Sun Pantoprazole Tablet (Standard)",
    "category": "Antacid",
    "mrp": 65,
    "composition": "Pantoprazole 20mg",
    "popular": false
  },
  {
    "name": "Sun Pantoprazole Tablet (Forte)",
    "category": "Antacid",
    "mrp": 135,
    "composition": "Pantoprazole 40mg IP",
    "popular": false
  },
  {
    "name": "Sun Pantoprazole Tablet (Plus)",
    "category": "Antacid",
    "mrp": 190,
    "composition": "Pantoprazole 40mg + Domperidone 30mg",
    "popular": false
  },
  {
    "name": "Sun Rabeprazole Tablet (Standard)",
    "category": "Antacid",
    "mrp": 75,
    "composition": "Rabeprazole 20mg",
    "popular": false
  },
  {
    "name": "Sun Rabeprazole Tablet (Forte)",
    "category": "Antacid",
    "mrp": 125,
    "composition": "Rabeprazole 20mg + Domperidone 30mg SR",
    "popular": false
  },
  {
    "name": "Sun Rabeprazole Tablet (Plus)",
    "category": "Antacid",
    "mrp": 210,
    "composition": "Rabeprazole 20mg + Levosulpiride 75mg",
    "popular": false
  },
  {
    "name": "Sun Omeprazole Tablet (Standard)",
    "category": "Antacid",
    "mrp": 35,
    "composition": "Omeprazole 10mg",
    "popular": false
  },
  {
    "name": "Sun Omeprazole Tablet (Forte)",
    "category": "Antacid",
    "mrp": 55,
    "composition": "Omeprazole 20mg IP",
    "popular": false
  },
  {
    "name": "Sun Omeprazole Tablet (Plus)",
    "category": "Antacid",
    "mrp": 120,
    "composition": "Omeprazole 20mg + Domperidone 10mg",
    "popular": false
  },
  {
    "name": "Sun Telmisartan Tablet (Standard)",
    "category": "Blood Pressure",
    "mrp": 75,
    "composition": "Telmisartan 20mg",
    "popular": false
  },
  {
    "name": "Sun Telmisartan Tablet (Forte)",
    "category": "Blood Pressure",
    "mrp": 130,
    "composition": "Telmisartan 40mg IP",
    "popular": false
  },
  {
    "name": "Sun Telmisartan Tablet (Plus)",
    "category": "Blood Pressure",
    "mrp": 220,
    "composition": "Telmisartan 40mg + Hydrochlorothiazide 12.5mg",
    "popular": false
  },
  {
    "name": "Sun Amlodipine Tablet (Standard)",
    "category": "Blood Pressure",
    "mrp": 35,
    "composition": "Amlodipine 2.5mg",
    "popular": false
  },
  {
    "name": "Sun Amlodipine Tablet (Forte)",
    "category": "Blood Pressure",
    "mrp": 65,
    "composition": "Amlodipine 5mg IP",
    "popular": false
  },
  {
    "name": "Sun Amlodipine Tablet (Plus)",
    "category": "Blood Pressure",
    "mrp": 95,
    "composition": "Amlodipine 10mg IP",
    "popular": false
  },
  {
    "name": "Sun Metoprolol Tablet (Standard)",
    "category": "Blood Pressure",
    "mrp": 60,
    "composition": "Metoprolol Succinate 25mg ER",
    "popular": false
  },
  {
    "name": "Sun Metoprolol Tablet (Forte)",
    "category": "Blood Pressure",
    "mrp": 110,
    "composition": "Metoprolol Succinate 50mg ER",
    "popular": false
  },
  {
    "name": "Sun Metoprolol Tablet (Plus)",
    "category": "Blood Pressure",
    "mrp": 160,
    "composition": "Metoprolol 25mg + Amlodipine 5mg",
    "popular": false
  },
  {
    "name": "Sun Atorvastatin Tablet (Standard)",
    "category": "Blood Pressure",
    "mrp": 70,
    "composition": "Atorvastatin 10mg IP",
    "popular": false
  },
  {
    "name": "Sun Atorvastatin Tablet (Forte)",
    "category": "Blood Pressure",
    "mrp": 120,
    "composition": "Atorvastatin 20mg IP",
    "popular": false
  },
  {
    "name": "Sun Atorvastatin Tablet (Plus)",
    "category": "Blood Pressure",
    "mrp": 210,
    "composition": "Atorvastatin 40mg IP",
    "popular": false
  },
  {
    "name": "Sun Rosuvastatin Tablet (Standard)",
    "category": "Blood Pressure",
    "mrp": 95,
    "composition": "Rosuvastatin 5mg IP",
    "popular": false
  },
  {
    "name": "Sun Rosuvastatin Tablet (Forte)",
    "category": "Blood Pressure",
    "mrp": 180,
    "composition": "Rosuvastatin 10mg IP",
    "popular": false
  },
  {
    "name": "Sun Rosuvastatin Tablet (Plus)",
    "category": "Blood Pressure",
    "mrp": 310,
    "composition": "Rosuvastatin 20mg IP",
    "popular": false
  },
  {
    "name": "Sun Metformin Tablet (Standard)",
    "category": "Diabetes",
    "mrp": 30,
    "composition": "Metformin 500mg SR",
    "popular": false
  },
  {
    "name": "Sun Metformin Tablet (Forte)",
    "category": "Diabetes",
    "mrp": 50,
    "composition": "Metformin 850mg IP",
    "popular": false
  },
  {
    "name": "Sun Metformin Tablet (Plus)",
    "category": "Diabetes",
    "mrp": 85,
    "composition": "Metformin 1000mg SR",
    "popular": false
  },
  {
    "name": "Sun Glimepiride Tablet (Standard)",
    "category": "Diabetes",
    "mrp": 65,
    "composition": "Glimepiride 1mg IP",
    "popular": false
  },
  {
    "name": "Sun Glimepiride Tablet (Forte)",
    "category": "Diabetes",
    "mrp": 120,
    "composition": "Glimepiride 2mg IP",
    "popular": false
  },
  {
    "name": "Sun Glimepiride Tablet (Plus)",
    "category": "Diabetes",
    "mrp": 180,
    "composition": "Glimepiride 1mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Sun Vildagliptin Tablet (Standard)",
    "category": "Diabetes",
    "mrp": 140,
    "composition": "Vildagliptin 50mg",
    "popular": false
  },
  {
    "name": "Sun Vildagliptin Tablet (Forte)",
    "category": "Diabetes",
    "mrp": 220,
    "composition": "Vildagliptin 50mg + Metformin 500mg",
    "popular": false
  },
  {
    "name": "Sun Vildagliptin Tablet (Plus)",
    "category": "Diabetes",
    "mrp": 290,
    "composition": "Vildagliptin 50mg + Metformin 1000mg",
    "popular": false
  }
];

// Flat names array for backward compatibility
export const MEDICINE_CATALOG: string[] = COMPREHENSIVE_MEDICINES.map((m) => m.name).sort((a, b) =>
  a.localeCompare(b)
);

// Search function for MedicineForm
export function findMedicines(query: string, limit = 20): string[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];

  return COMPREHENSIVE_MEDICINES
    .filter((med) =>
      terms.every(
        (term) =>
          med.name.toLowerCase().includes(term) ||
          med.composition.toLowerCase().includes(term) ||
          med.category.toLowerCase().includes(term)
      )
    )
    .sort((a, b) => {
      const normalized = query.toLowerCase().trim();
      const aStarts = a.name.toLowerCase().startsWith(normalized);
      const bStarts = b.name.toLowerCase().startsWith(normalized);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    })
    .slice(0, limit)
    .map((m) => m.name);
}

// Rich search function returning full details
export function searchMedicineDetails(query: string, limit = 80): MedicineItem[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) {
    return COMPREHENSIVE_MEDICINES.slice(0, limit);
  }

  return COMPREHENSIVE_MEDICINES
    .filter((med) =>
      terms.every(
        (term) =>
          med.name.toLowerCase().includes(term) ||
          med.composition.toLowerCase().includes(term) ||
          med.category.toLowerCase().includes(term)
      )
    )
    .sort((a, b) => {
      const normalized = query.toLowerCase().trim();
      const aStarts = a.name.toLowerCase().startsWith(normalized);
      const bStarts = b.name.toLowerCase().startsWith(normalized);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    })
    .slice(0, limit);
}
