'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import apiClient from '@/lib/apiClient';
import WorkspaceCard from '@/components/WorkspaceCard';
interface Workspace {
  _id: string;
  name: string;
  description: string;
  role: string;
}
export default function WorkspacesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    if (!loading && user === null) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const res = await apiClient.get('/workspaces');
        setWorkspaces(res.data.workspaces);
      } catch (err) {
        setFetchError('Failed to load workspaces');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Workspaces</h1>

      {fetchLoading && <p>Loading...</p>}

      {!fetchLoading && fetchError && (
        <p className="text-red-600">{fetchError}</p>
      )}

      {!fetchLoading && !fetchError && (
        <div className="space-y-3">
          {workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace._id}
              name={workspace.name}
              description={workspace.description}
              role={workspace.role}
              onClick={() => console.log(workspace._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}