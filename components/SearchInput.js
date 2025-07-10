import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchInput({ onSearch, placeholder = "搜索电影..." }) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        // 如果没有提供onSearch回调函数，则导航到搜索页面
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  // 处理输入框内容变化
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // 清空搜索框
  const handleClear = () => {
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-container">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="search-input"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-button"
            aria-label="清除搜索"
          >
            ×
          </button>
        )}
        <button
          type="submit"
          className="search-button"
          disabled={!query.trim()}
        >
          搜索
        </button>
      </div>
      
      <style jsx>{`
        .search-form {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .search-input-container {
          display: flex;
          align-items: center;
          background: white;
          border: 2px solid #e1e5e9;
          border-radius: 25px;
          padding: 8px 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: border-color 0.2s ease;
        }

        .search-input-container:focus-within {
          border-color: #007bff;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 8px 12px;
          font-size: 16px;
          background: transparent;
        }

        .search-input::placeholder {
          color: #999;
        }

        .clear-button {
          background: none;
          border: none;
          font-size: 20px;
          color: #999;
          cursor: pointer;
          padding: 0 8px;
          margin-right: 8px;
          transition: color 0.2s ease;
        }

        .clear-button:hover {
          color: #666;
        }

        .search-button {
          background: #007bff;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: background-color 0.2s ease;
        }

        .search-button:hover:not(:disabled) {
          background: #0056b3;
        }

        .search-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .search-input-container {
            padding: 6px 12px;
          }
          
          .search-input {
            font-size: 14px;
            padding: 6px 8px;
          }
          
          .search-button {
            padding: 6px 12px;
            font-size: 12px;
          }
        }
      `}</style>
    </form>
  );
}