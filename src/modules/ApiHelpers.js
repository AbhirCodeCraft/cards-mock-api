export const getAllItems = async () => {
    const response = await fetch('/api/items');
    return await response.json();
  };
  
  export const addItem = async (item) => {
    const response = await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    return await response.json();
  };
  
  export const removeItem = async (id) => {
    const response = await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });
    return await response.json();
  };
  