import '@annotorious/annotorious/annotorious.css';

import React, { useEffect, useRef, useState } from 'react';

import { createImageAnnotator } from '@annotorious/annotorious';

function ImageAnnotationDemo() {
  const imgRef = useRef(null);
  const annoRef = useRef(null);
  const [annotations, setAnnotations] = useState([]);

  useEffect(() => {
    if (imgRef.current && !annoRef.current) {
      // Initialize the annotator
      annoRef.current = createImageAnnotator(imgRef.current, {
        drawingEnabled: true,
        style: {
          fill: '#ff0000',
          fillOpacity: 0.25
        }
      });

      // Attach event listeners
      annoRef.current.on('createAnnotation', (annotation) => {
        console.log('Annotation created:', annotation);
        setAnnotations(prev => [...prev, annotation]);
      });

      annoRef.current.on('updateAnnotation', (annotation, previous) => {
        console.log('Annotation updated:', annotation);
        setAnnotations(prev => 
          prev.map(a => a.id === annotation.id ? annotation : a)
        );
      });

      annoRef.current.on('deleteAnnotation', (annotation) => {
        console.log('Annotation deleted:', annotation);
        setAnnotations(prev => prev.filter(a => a.id !== annotation.id));
      });
    }

    // Cleanup
    return () => {
      if (annoRef.current) {
        annoRef.current.destroy();
        annoRef.current = null;
      }
    };
  }, []);

  return (
    <div className="image-annotation-demo">
      <header className="App-header">
        <h1>Image Annotation Demo</h1>
        <p>Click and drag to create annotations on the image below</p>
      </header>
      
      <div className="annotation-container">
        <img 
          ref={imgRef}
          id="sample-image"
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
          alt="Sample for annotation"
          crossOrigin="anonymous"
        />
        
        <div className="instructions">
          <h3>How to use:</h3>
          <ul>
            <li>Click and drag on the image to create a rectangular annotation</li>
            <li>Click on an existing annotation to select it</li>
            <li>Click the delete button to remove an annotation</li>
            <li>Check the browser console to see annotation events</li>
          </ul>
        </div>

        <div className="annotations-display">
          <h3>Annotation Positions</h3>
          {annotations.length === 0 ? (
            <p className="no-annotations">No annotations yet. Draw on the image to create one.</p>
          ) : (
            <div className="annotations-list">
              {annotations.map((annotation, index) => {
                const geometry = annotation.target?.selector?.geometry;
                const bounds = geometry?.bounds;
                
                return (
                  <div key={annotation.id} className="annotation-item">
                    <h4>Annotation {index + 1}</h4>
                    {bounds && (
                      <div className="position-info">
                        <div className="position-row">
                          <span className="label">X:</span>
                          <span className="value">{Math.round(bounds.minX)} → {Math.round(bounds.maxX)}</span>
                        </div>
                        <div className="position-row">
                          <span className="label">Y:</span>
                          <span className="value">{Math.round(bounds.minY)} → {Math.round(bounds.maxY)}</span>
                        </div>
                        <div className="position-row">
                          <span className="label">Width:</span>
                          <span className="value">{Math.round(geometry.w)}px</span>
                        </div>
                        <div className="position-row">
                          <span className="label">Height:</span>
                          <span className="value">{Math.round(geometry.h)}px</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageAnnotationDemo;
