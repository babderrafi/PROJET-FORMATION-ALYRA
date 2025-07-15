package com.nftcar.alyra.service;

import com.nftcar.alyra.domain.NFTLevel;
import com.nftcar.alyra.repository.NFTLevelRepository;
import com.nftcar.alyra.service.dto.NFTLevelDTO;
import com.nftcar.alyra.service.mapper.NFTLevelMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link NFTLevel}.
 */
@Service
@Transactional
public class NFTLevelService {

    private final Logger log = LoggerFactory.getLogger(NFTLevelService.class);

    private final NFTLevelRepository nFTLevelRepository;

    private final NFTLevelMapper nFTLevelMapper;

    public NFTLevelService(NFTLevelRepository nFTLevelRepository, NFTLevelMapper nFTLevelMapper) {
        this.nFTLevelRepository = nFTLevelRepository;
        this.nFTLevelMapper = nFTLevelMapper;
    }

    /**
     * Save a nFTLevel.
     *
     * @param nFTLevelDTO the entity to save.
     * @return the persisted entity.
     */
    public NFTLevelDTO save(NFTLevelDTO nFTLevelDTO) {
        log.debug("Request to save NFTLevel : {}", nFTLevelDTO);
        NFTLevel nFTLevel = nFTLevelMapper.toEntity(nFTLevelDTO);
        nFTLevel = nFTLevelRepository.save(nFTLevel);
        return nFTLevelMapper.toDto(nFTLevel);
    }

    /**
     * Partially update a nFTLevel.
     *
     * @param nFTLevelDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<NFTLevelDTO> partialUpdate(NFTLevelDTO nFTLevelDTO) {
        log.debug("Request to partially update NFTLevel : {}", nFTLevelDTO);

        return nFTLevelRepository
            .findById(nFTLevelDTO.getId())
            .map(existingNFTLevel -> {
                nFTLevelMapper.partialUpdate(existingNFTLevel, nFTLevelDTO);

                return existingNFTLevel;
            })
            .map(nFTLevelRepository::save)
            .map(nFTLevelMapper::toDto);
    }

    /**
     * Get all the nFTLevels.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<NFTLevelDTO> findAll() {
        log.debug("Request to get all NFTLevels");
        return nFTLevelRepository.findAll().stream().map(nFTLevelMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one nFTLevel by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<NFTLevelDTO> findOne(Long id) {
        log.debug("Request to get NFTLevel : {}", id);
        return nFTLevelRepository.findById(id).map(nFTLevelMapper::toDto);
    }

    /**
     * Delete the nFTLevel by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete NFTLevel : {}", id);
        nFTLevelRepository.deleteById(id);
    }
}
