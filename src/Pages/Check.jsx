import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Check() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedLab, setSelectedLab] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [tablesData, setTablesData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
    setSelectedLab('');
    setSelectedProduct('');
    setSelectedOption('');
    setTablesData([]);
  };

  const handleLabChange = (event) => {
    setSelectedLab(event.target.value);
    setSelectedProduct('');
    setSelectedOption('');
    setTablesData([]); // Reset tablesData when lab changes
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
    setSelectedOption('');
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderLabOptions = () => {
    switch (selectedDepartment) {
      case 'Computer Engineering':
        return (
          <>
            <option value="">Select the Lab-ID</option>
            <option value="A1-101">A1-101</option>
            <option value="A1-102">A1-102</option>
            <option value="A1-103">A1-103</option>
          </>
        );
      case 'Information Technology':
        return (
          <>
            <option value="">Select the Lab-ID</option>
            <option value="A3-301">A3-301</option>
            <option value="A3-302">A3-302</option>
            <option value="A3-303">A3-303</option>
            <option value="A3-401">A3-401</option>
            <option value="A3-402">A3-402</option>
            <option value="A3-403">A3-403</option>
          </>
        );
      case 'Electronics & Telecommunication':
        return (
          <>
            <option value="">Select the Lab-ID</option>
            <option value="A3-201">A3-201</option>
            <option value="A3-202">A3-202</option>
            <option value="A3-203">A3-203</option>
          </>
        );
      default:
        return <option value="">Select the Lab-ID</option>;
    }
  };

  const renderOptionRange = () => {
    if (selectedProduct === 'Computer') {
      return Array.from({ length: 25 }, (_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ));
    } else if (selectedProduct === 'Printers') {
      return Array.from({ length: 3 }, (_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ));
    } else if (selectedProduct === 'LAN') {
      return Array.from({ length: 25 }, (_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ));
    } else {
      return <option value="">Select an Option</option>;
    }
  };

  const getRandomSupplierName = () => {
    const suppliers = ['Supplier 1', 'Supplier 2', 'Supplier 3', 'Supplier 4'];
    return suppliers[Math.floor(Math.random() * suppliers.length)];
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let defaultDescription = '';
    let defaultPurchasePrice = '';
    let defaultTax = '';
    let defaultSupplierInfo = '';
    
    switch (selectedProduct) {
      case 'Computer':
        defaultDescription = 'Specifications: Processor - Intel Core i5, RAM - 8GB, Storage - 512GB SSD';
        defaultPurchasePrice = '₹50000';
        defaultTax = '5%';
        defaultSupplierInfo = getRandomSupplierName();
        break;
      case 'Printers':
        defaultDescription = 'Specifications: Printer Type - Laser, Printing Technology - Monochrome';
        defaultPurchasePrice = '₹20000';
        defaultTax = '7%';
        defaultSupplierInfo = getRandomSupplierName();
        break;
      case 'LAN':
        defaultDescription = 'Specifications: Speed - 1Gbps, Ports - 8, Type - Managed';
        defaultPurchasePrice = '₹10000';
        defaultTax = '3%';
        defaultSupplierInfo = getRandomSupplierName();
        break;
      default:
        break;
    }
    
    const uniqueId = `${selectedLab}/${selectedProduct === 'Computer' ? '01' : selectedProduct === 'Printers' ? '02' : '03'}/${selectedOption}`;
    const newData = {
      product: selectedProduct,
      serialNumber: selectedOption,
      uniqueId,
      description: defaultDescription,
      supplierDate: '2024-04-07',
      purchasePrice: defaultPurchasePrice,
      tax: defaultTax, // Tax format remains the same
      purchaseDate: '2024-04-07',
      expiryDate: selectedProduct === 'Computer' ? '2025-04-07' : selectedProduct === 'Printers' ? '2026-04-07' : '2027-04-07',
      supplierInformation: defaultSupplierInfo, // Changed to supplier information
    };
    
    if (formSubmitted && editIndex !== null) {
      const updatedData = [...tablesData];
      updatedData[editIndex] = newData;
      setTablesData(updatedData);
    } else {
      setTablesData([...tablesData, newData]);
    }
    
    setSelectedProduct('');
    setSelectedOption('');
    setFormSubmitted(true);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    const rowData = tablesData[index];
    setSelectedProduct(rowData.product);
    setSelectedOption(rowData.serialNumber); 
    
    setEditIndex(index);
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...tablesData];
    updatedData[index][field] = value;
    setTablesData(updatedData);
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="selectDepartment" className="block text-gray-700 font-bold mb-2">Choose a Department:</label>
            <select id="selectDepartment" value={selectedDepartment} onChange={handleDepartmentChange} className="w-full p-2 border border-gray-400 rounded-md custom-select">
              <option value="">Select the Department</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
            </select>
          </div>

          {selectedDepartment && (
            <div>
              <label htmlFor="selectLab" className="block text-gray-700 font-bold mb-2">Choose a Lab-ID:</label>
              <select id="selectLab" value={selectedLab} onChange={handleLabChange} className="w-full p-2 border border-gray-400 rounded-md custom-select">
                {renderLabOptions()}
              </select>
              {selectedLab && <p className="text-gray-600 mt-2">You selected Lab-ID: {selectedLab}</p>}
            </div>
          )}

          {selectedDepartment && selectedLab && (
            <div>
              <label htmlFor="selectProduct" className="block text-gray-700 font-bold mb-2">Choose a Product:</label>
              <select id="selectProduct" value={selectedProduct} onChange={handleProductChange} className="w-full p-2 border border-gray-400 rounded-md custom-select">
                <option value="">Select the Product</option>
                <option value="Computer">Computer</option>
                <option value="Printers">Printers</option>
                <option value="LAN">LAN</option>
              </select>
              {selectedProduct && (
                <div>
                  <label htmlFor="selectOption" className="block text-gray-700 font-bold mb-2">Choose an Option:</label>
                  <select id="selectOption" value={selectedOption} onChange={handleOptionChange} className="w-full p-2 border border-gray-400 rounded-md custom-select">
                    {renderOptionRange()}
                  </select>
                </div>
              )}
              {selectedOption && <p className="text-gray-600 mt-2">You selected Option: {selectedOption}</p>}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">{editIndex !== null ? 'Update' : 'Submit'}</button>
            </div>
          )}
        </form>
      </div>

      {tablesData.length > 0 && (
        <div className="max-w-screen-xl mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Selected Product - {selectedProduct}</h2> {/* Updated to show selectedProduct instead of tablesData[0].product */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Serial Number</th>
                    <th className="border px-4 py-2">Unique ID</th>
                    <th className="border px-4 py-2">Description</th>
                    <th className="border px-4 py-2">Supplier Information</th>
                    <th className="border px-4 py-2">Purchase Price</th>
                    <th className="border px-4 py-2">Tax (%)</th>
                    <th className="border px-4 py-2">Purchase Date</th>
                    <th className="border px-4 py-2">Expiry Date</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tablesData.map((data, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.serialNumber} onChange={(e) => handleInputChange(index, 'serialNumber', e.target.value)} /> : data.serialNumber}</td>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.uniqueId} onChange={(e) => handleInputChange(index, 'uniqueId', e.target.value)} /> : data.uniqueId}</td>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.description} onChange={(e) => handleInputChange(index, 'description', e.target.value)} /> : data.description}</td>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.supplierInformation} onChange={(e) => handleInputChange(index, 'supplierInformation', e.target.value)} /> : data.supplierInformation}</td>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.purchasePrice} onChange={(e) => handleInputChange(index, 'purchasePrice', e.target.value)} /> : data.purchasePrice}</td>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.tax} onChange={(e) => handleInputChange(index, 'tax', e.target.value)} /> : data.tax}</td>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.purchaseDate} onChange={(e) => handleInputChange(index, 'purchaseDate', e.target.value)} /> : data.purchaseDate}</td>
                      <td className="border px-4 py-2">{editIndex === index ? <input type="text" value={data.expiryDate} onChange={(e) => handleInputChange(index, 'expiryDate', e.target.value)} /> : data.expiryDate}</td>
                      <td className="border px-4 py-2">
                        {editIndex === index ? <button onClick={() => setEditIndex(null)}>Save</button> : <button onClick={() => handleEdit(index)}>Edit</button>}
                        {/* Add delete option if needed */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Check;
