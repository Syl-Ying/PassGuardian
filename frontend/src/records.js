  // delete a record
export async function deleteRecord(id) {
    await axios.delete(`/api/records/delete/${id}`);
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
}