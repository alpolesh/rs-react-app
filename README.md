# Performance Profiling Task
## Before optimization:
### Selecting another year 
- Commit Duration: 2.2s.
- Render Duration: 321ms.
- Interactions: Input.
- Flamegraph:
<img width="959" height="230" alt="image" src="https://github.com/user-attachments/assets/ff3891cf-a355-482c-95b9-0ed0152d3afe" />
 - Ranked:
<img width="982" height="302" alt="image" src="https://github.com/user-attachments/assets/752c52ba-710e-49e0-ad26-025150a0085a" />

### Sorting a column
- Commit Duration: 2.1s.
- Render Duration: 322.5ms.
- Interactions: Select.
- Flamegraph:
<img width="923" height="179" alt="image" src="https://github.com/user-attachments/assets/f73e7c76-e9af-4a39-afc0-cc32050a2c67" />
 - Ranked:
<img width="1042" height="159" alt="image" src="https://github.com/user-attachments/assets/df249c03-e01f-4d16-9a91-88c2d35ea173" />

### Searching a country
- Commit Duration: 1.8s.
- Render Duration: 70.2ms.
- Interactions: Input.
- Flamegraph:
<img width="1012" height="246" alt="image" src="https://github.com/user-attachments/assets/da4ef77c-bba1-4df6-a5f1-a2c2d600fd63" />
 - Ranked:
<img width="982" height="244" alt="image" src="https://github.com/user-attachments/assets/1a1713cd-9138-4e77-9463-004ee38b2950" />

### Adding/removing columns
- Commit Duration: 3.2s.
- Render Duration: 351.6ms.
- Interactions: Click.
- Flamegraph:
<img width="969" height="228" alt="image" src="https://github.com/user-attachments/assets/01840929-dbbd-4aa5-b013-a09b0f786bbe" />
 - Ranked:
<img width="1017" height="166" alt="image" src="https://github.com/user-attachments/assets/d3357732-c1b4-4588-b6d8-5b642c0797c8" />

## After optimization:
### Selecting another year 
- Commit Duration: 1.9s.
- Render Duration: 304.1ms.
- Interactions: Input.
- Flamegraph:
<img width="984" height="227" alt="image" src="https://github.com/user-attachments/assets/bbde1909-0a7b-4524-bff9-e1e6e9599ccd" />

 - Ranked:
<img width="1017" height="171" alt="image" src="https://github.com/user-attachments/assets/839e0f96-a236-49d7-b384-869de358b21f" />

### Sorting a column
- Commit Duration: 2.3s.
- Render Duration: 321.7ms.
- Interactions: Select.
- Flamegraph:
<img width="961" height="162" alt="image" src="https://github.com/user-attachments/assets/807000a4-1da8-4f42-95a7-37e56072d80e" />
 - Ranked:
<img width="1010" height="188" alt="image" src="https://github.com/user-attachments/assets/baf73ff1-966c-4838-b619-a122de4b6a48" />

### Searching a country
- Commit Duration: 1.8s.
- Render Duration: 67.1ms.
- Interactions: Input.
- Flamegraph:
<img width="944" height="244" alt="image" src="https://github.com/user-attachments/assets/df5a0cb6-d98f-4128-821c-256bd7bde4ef" />
 - Ranked:
<img width="1004" height="293" alt="image" src="https://github.com/user-attachments/assets/6ca635d0-bc1e-4c08-9684-da175feaddb2" />

### Adding/removing columns
- Commit Duration: 3s.
- Render Duration: 388.8ms.
- Interactions: Click.
- Flamegraph:
<img width="959" height="243" alt="image" src="https://github.com/user-attachments/assets/10a40204-6f73-499b-93fd-79c528c2049b" />
 - Ranked:
<img width="988" height="352" alt="image" src="https://github.com/user-attachments/assets/5751fa67-1022-4079-b50f-d4bf50a118ed" />
