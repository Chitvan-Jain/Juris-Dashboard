"use client"
import React from "react"
import { useState, useEffect } from "react"
import { PlusCircle, Search, Upload } from "lucide-react"
import { collection, addDoc, getDocs } from "firebase/firestore"
import { db } from "../../firebase"

export default function TeamTab() {
  const [members, setMembers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("")
  const [newMember, setNewMember] = useState({ name: "", role: "", Description: "" })

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const membersCollection = collection(db, "team_members")
      const membersSnapshot = await getDocs(membersCollection)
      const membersList = membersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setMembers(membersList)
    } catch (error) {
      console.error("Error fetching members: ", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewMember({ ...newMember, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "team_members"), newMember)
      setMembers([...members, { id: docRef.id, ...newMember }])
      setNewMember({ name: "", role: "", Description: "" })
    } catch (error) {
      console.error("Error adding document: ", error)
    }
  }

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterRole === "" || member.role.toLowerCase() === filterRole.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-green-600">Team Members</h2>

      {/* Horizontal Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newMember.name}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border-green-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={newMember.role}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border-green-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="Description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            id="Description"
            name="Description"
            value={newMember.Description}
            onChange={handleInputChange}
            required
            className="w-full rounded-md border-green-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="w-full text-sm text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
        </div>
        <button
          type="submit"
          className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Member
        </button>
      </form>

      <div className="flex items-center space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800"
          />
          <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="rounded-lg border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">All Roles</option>
          <option value="Lawyer">Lawyer</option>
          <option value="Paralegal">Paralegal</option>
          <option value="Associate">Associate</option>
        </select>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <Upload className="w-5 h-5 mr-2" />
          Upload Excel
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredMembers.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{member.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{member.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{member.Description}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

