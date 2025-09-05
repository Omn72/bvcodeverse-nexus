import React, { useState } from 'react'
import { searchUsers, initializeUserAccount } from '@/lib/supabase'
import { Loader2 } from 'lucide-react'

const TestPanel = () => {
  const [testResults, setTestResults] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const testSearch = async () => {
    setIsLoading(true)
    setTestResults('')
    
    try {
      // Test search functionality
      const { data, error } = await searchUsers('test', 10)
      
      if (error) {
        setTestResults(`Error: ${error.message}`)
      } else {
        setTestResults(`Found ${data?.length || 0} users: ${JSON.stringify(data, null, 2)}`)
      }
    } catch (err: any) {
      setTestResults(`Exception: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testInit = async () => {
    setIsLoading(true)
    setTestResults('')
    
    try {
      // Test profile initialization
      const result = await initializeUserAccount('test-init-user', 'test@example.com')
      setTestResults(`Initialize result: ${JSON.stringify(result, null, 2)}`)
    } catch (err: any) {
      setTestResults(`Exception: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 border border-gray-700 rounded-lg p-4 max-w-md z-50">
      <h3 className="text-white font-bold mb-4">🧪 Database Test Panel</h3>
      
      <div className="space-y-2">
        <button
          onClick={testSearch}
          disabled={isLoading}
          className="w-full px-3 py-2 bg-cyan-500 text-black rounded font-medium hover:bg-cyan-400 disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin inline" /> : 'Test Search'}
        </button>
        
        <button
          onClick={testInit}
          disabled={isLoading}
          className="w-full px-3 py-2 bg-purple-500 text-black rounded font-medium hover:bg-purple-400 disabled:opacity-50"
        >
          Test Init
        </button>
      </div>
      
      {testResults && (
        <div className="mt-4 p-3 bg-black rounded text-xs text-green-400 max-h-32 overflow-y-auto">
          <pre>{testResults}</pre>
        </div>
      )}
    </div>
  )
}

export default TestPanel
