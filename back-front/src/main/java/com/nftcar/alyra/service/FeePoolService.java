package com.nftcar.alyra.service;

import com.nftcar.alyra.domain.FeePool;
import com.nftcar.alyra.repository.FeePoolRepository;
import com.nftcar.alyra.service.dto.FeePoolDTO;
import com.nftcar.alyra.service.mapper.FeePoolMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link FeePool}.
 */
@Service
@Transactional
public class FeePoolService {

    private final Logger log = LoggerFactory.getLogger(FeePoolService.class);

    private final FeePoolRepository feePoolRepository;

    private final FeePoolMapper feePoolMapper;

    public FeePoolService(FeePoolRepository feePoolRepository, FeePoolMapper feePoolMapper) {
        this.feePoolRepository = feePoolRepository;
        this.feePoolMapper = feePoolMapper;
    }

    /**
     * Save a feePool.
     *
     * @param feePoolDTO the entity to save.
     * @return the persisted entity.
     */
    public FeePoolDTO save(FeePoolDTO feePoolDTO) {
        log.debug("Request to save FeePool : {}", feePoolDTO);
        FeePool feePool = feePoolMapper.toEntity(feePoolDTO);
        feePool = feePoolRepository.save(feePool);
        return feePoolMapper.toDto(feePool);
    }

    /**
     * Partially update a feePool.
     *
     * @param feePoolDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<FeePoolDTO> partialUpdate(FeePoolDTO feePoolDTO) {
        log.debug("Request to partially update FeePool : {}", feePoolDTO);

        return feePoolRepository
            .findById(feePoolDTO.getId())
            .map(existingFeePool -> {
                feePoolMapper.partialUpdate(existingFeePool, feePoolDTO);

                return existingFeePool;
            })
            .map(feePoolRepository::save)
            .map(feePoolMapper::toDto);
    }

    /**
     * Get all the feePools.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<FeePoolDTO> findAll() {
        log.debug("Request to get all FeePools");
        return feePoolRepository.findAll().stream().map(feePoolMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one feePool by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<FeePoolDTO> findOne(Long id) {
        log.debug("Request to get FeePool : {}", id);
        return feePoolRepository.findById(id).map(feePoolMapper::toDto);
    }

    /**
     * Delete the feePool by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete FeePool : {}", id);
        feePoolRepository.deleteById(id);
    }
}
