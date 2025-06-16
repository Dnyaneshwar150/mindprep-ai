// hooks/useMindmapVisibility.ts
import { useState, useCallback, useMemo } from 'react';
import { Node, Edge } from '@xyflow/react';

export function useMindmapVisibility(nodes: Node[], edges: Edge[]) {
  const [visibleChildrenMap, setVisibleChildrenMap] = useState<Record<string, boolean>>({});

  const handleToggleChildrenVisibility = useCallback((nodeId: string) => {
    setVisibleChildrenMap(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  }, []);

  const enhancedNodes = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        nodeId: node.id,
        areChildrenVisible: visibleChildrenMap[node.id] ?? true,
        onToggleChildrenVisibility: handleToggleChildrenVisibility,
      },
    }));
  }, [nodes, visibleChildrenMap]);

  const filteredEdges = useMemo(() => {
    return edges.filter(edge => {
      const parentHiddenChildren = visibleChildrenMap[edge.source] === false;
      return !parentHiddenChildren;
    });
  }, [edges, visibleChildrenMap]);

  const filteredNodes = useMemo(() => {
    const parentMap = new Map<string, string>();
    edges.forEach(edge => {
      parentMap.set(edge.target, edge.source);
    });

    const isVisible = (nodeId: string): boolean => {
      let currentId = nodeId;
      while (parentMap.has(currentId)) {
        const parentId = parentMap.get(currentId)!;
        if (visibleChildrenMap[parentId] === false) return false;
        currentId = parentId;
      }
      return true;
    };

    return enhancedNodes.filter(node => isVisible(node.id));
  }, [enhancedNodes, visibleChildrenMap, edges]);

  return {
    enhancedNodes,
    filteredEdges,
    filteredNodes,
    handleToggleChildrenVisibility,
  };
}
